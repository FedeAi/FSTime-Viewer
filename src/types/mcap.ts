export interface McapMessage {
  timestamp: number;
  topic: string;
  headerStamp?: number;
  data: any;
}

export interface TopicData {
  name: string;
  messages: McapMessage[];
  minTime: number;
  maxTime: number;
}