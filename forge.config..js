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
      },
      {
        name: '@electron-forge/maker-zip',     // macOS and Linux ZIP
        platforms: ['darwin', 'linux'],
      },
      {
        name: '@electron-forge/maker-dmg',     // macOS DMG
        config: {
          background: './assets/dmg-background.png', // Optional DMG background
          icon: './assets/icons/dmg_icon.icns',      // Optional DMG specific icon
        },
      },
      {
        name: '@electron-forge/maker-deb',     // Linux DEB
        config: {},
      },
      {
        name: '@electron-forge/maker-rpm',     // Linux RPM
        config: {},
      },
    ],
    publishers: [ // Optional GitHub Publisher
      {
        name: '@electron-forge/publisher-github',
        config: {
          repository: {
            owner: 'your-github-username',
            name: 'fs-timeline-viewer', // Assuming your repo is named this
          },
          prerelease: false,
        },
      },
    ],
    plugins: [
      // ... your plugins
    ],
  };