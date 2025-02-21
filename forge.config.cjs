const { platform } = require('process');

// forge.config.js
module.exports = {
    packagerConfig: {
      asar: true,
      icon: './assets/icons/app_icon',
      appCategory: 'public.app-category.productivity', // Example category for macOS App Store
    },
    rebuildConfig: {},
    makers: [
      {
        name: '@electron-forge/maker-squirrel', // Windows Installer
        config: {
          name: 'FSTimelineViewer', // Application name in installer
        },
        platforms: ['win32'],
      },
      {
        name: '@electron-forge/maker-zip',     // macOS and Linux ZIP
        platforms: ['darwin', 'linux'],
      },
      {
        name: '@electron-forge/maker-deb',     // Linux DEB
        config: {},
        platforms: ['linux'],
      },
      {
        name: '@electron-forge/maker-rpm',     // Linux RPM
        config: {},
        platforms: ['linux'],
      },
    ],
    publishers: [ // Optional GitHub Publisher
      {
        name: '@electron-forge/publisher-github',
        config: {
          repository: {
            owner: 'FedeAi',
            name: 'FSTime-Viewer', // Assuming your repo is named this
          },
          prerelease: false,
        },
      },
       // Only include dmg maker if not running on Linux
    ...(platform !== 'linux'
      ? [
          {
            name: '@electron-forge/maker-dmg', // macOS DMG
            config: {
              background: './assets/dmg-background.png',
              icon: './assets/icons/dmg_icon.icns',
            },
            platforms: ['darwin'],
          },
        ]
      : []),
    ],
    plugins: [
      // ... your plugins
    ],
  };