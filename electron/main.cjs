const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const { loadDecompressHandlers } = require("@mcap/support");
const { FileHandleReadable } = require("@mcap/nodejs");
const { McapIndexedReader, ReadableFile, McapStreamReader, TypedMcapRecords } = require("@mcap/core");
const { parse, stringify } = require("@foxglove/rosmsg");
const { MessageReader } = require("@foxglove/rosmsg2-serialization");


const { open } = require("fs/promises");
const { read } = require('fs');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:5173'
      : `file://${path.join(__dirname, '../dist/index.html')}`
  );

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// MCAP file handling
ipcMain.handle('parse-mcap', async (event, filePath) => {
  try {
    const decompressHandlers = await loadDecompressHandlers();
    const fileHandle = await open(filePath, "r");
    const reader = await McapIndexedReader.Initialize({
      readable: new FileHandleReadable(fileHandle),
      decompressHandlers,
    });



    // Get all topics and their schemas
    const channels = reader.channelsById; // map<Number, Channel>
    const topicMap = new Map();
    for (const channel of channels.values()) {
      topicMap.set(channel.id.toString(), channel);
    }

    // // Map to store channel schemas
    // console.log('Schemas:', reader.schemasById);
    // console.log('SChemas data to utf8:', reader.schemasById.get(1).data.toString('utf8'));
    // console.log('SChemas data to utf8:', new TextDecoder().decode(reader.schemasById.get(1).data));

    // Map channel id to schema definition
    const channel2SchemaDef = new Map();
    for (const [id, schema] of reader.schemasById.entries()) {
      const decoded = new TextDecoder().decode(schema.data);
      const cleaned = decoded.replace(/(?<!=)\s\d\s*$/gm, ''); // remove trailing numbers not following a '='
      const schemaDef = parse(cleaned);
      channel2SchemaDef.set(id, schemaDef);
    }

    // Map channel id to MessageReader
    const channel2MessageReader = new Map();
    for (const [id, schemaDef] of channel2SchemaDef.entries()) {
      channel2MessageReader.set(id, new MessageReader(schemaDef, { timeType: "sec,nanosec"} ));
    }



    // Print decoded schemas data
    // for (const [id, schema] of reader.schemasById.entries()) {
    //   const data = schema.data;
    //   // decode data
    //   const decodedData = 
    // }
    // Process messages and organize by topic
    const messagesByTopic = new Map();
    let globalStartTime = Infinity;
    let globalEndTime = -Infinity;

    for await (const message of reader.readMessages()) {
      const channel = topicMap.get(message.channelId.toString());
      if (!channel) continue;

      const topicName = channel.topic;
      if (!messagesByTopic.has(topicName)) {
        messagesByTopic.set(topicName, []);
      }

      // Extract timestamp and header stamp if present
      const timestamp = Number(message.logTime) / 1e9; // Convert nanoseconds to seconds
      let headerStamp;
      try {
        // console.log('Channel id:', message.channelId);
        // console.log('Channel schema:', channel2SchemaDef.get(message.channelId));
        // console.log('Message data:', message);
        
        const parsedMsg = channel2MessageReader.get(message.channelId).readMessage(message.data); // Renamed inner variable
        if (parsedMsg.header && parsedMsg.header.stamp) {
          headerStamp = parsedMsg.header.stamp.sec + parsedMsg.header.stamp.nanosec / 1e9;
        }

      } catch (e) {
        // console.warn('Could not parse message data for header stamp');
        // console.error(`Error parsing message on channel ${message.channelId}: ${e.message}`, e);

      }
      console.log('Timestamp:', timestamp);
      console.log('Header stamp:', headerStamp);
      console.log('-------------------');

      const mcapMessage = {
        timestamp,
        topic: topicName,
        headerStamp,
        data: message.data
      };

      messagesByTopic.get(topicName).push(mcapMessage);

      // Update global time range
      globalStartTime = Math.min(globalStartTime, timestamp);
      globalEndTime = Math.max(globalEndTime, timestamp);
      if (headerStamp) {
        globalStartTime = Math.min(globalStartTime, headerStamp);
        globalEndTime = Math.max(globalEndTime, headerStamp);
      }
    }

    // Convert to array format
    const topicsData = Array.from(messagesByTopic.entries()).map(
      ([name, messages]) => ({
        name,
        messages: messages.sort((a, b) => a.timestamp - b.timestamp),
        minTime: Math.min(...messages.map(m => m.timestamp)),
        maxTime: Math.max(...messages.map(m => 
          Math.max(m.timestamp, m.headerStamp || m.timestamp)
        ))
      })
    );

    await fileHandle.close();

    return {
      topics: topicsData,
      timeRange: { start: globalStartTime, end: globalEndTime }
    };
  } catch (error) {
    console.error('Error parsing MCAP file:', error);
    throw error;
  }
});