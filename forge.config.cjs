const { options } = require('dropzone');
const { option } = require('framer-motion/client');
const { platform, config } = require('process');


async function cleanupEmptyFolders (folder, exclude) {
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  if (!(await fsp.stat(folder)).isDirectory()) return

  const folderName = path.basename(folder)
  if (exclude && exclude.includes(folderName)) {
    return
  }

  // eslint-disable-next-line security/detect-non-literal-fs-filename
  let files = await fsp.readdir(folder)

  if (files.length > 0) {
    await Promise.all(files.map(file => cleanupEmptyFolders(path.join(folder, file), exclude)))
    // Re-evaluate files; after deleting subfolders we may have an empty parent
    // folder now.
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    files = await fsp.readdir(folder)
  }

  if (files.length === 0) {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    await fsp.rmdir(folder)
  }
}

// forge.config.js
module.exports = {
    packagerConfig: {
      asar: true,
      icon: './assets/icons/app_icon',
      appCategory: 'public.app-category.productivity', // Example category for macOS App Store
      prune: true,
      // afterPrune: [
      //   async (buildPath, electronVersion, platform, arch) => {
      //     // Do something after pruning
      //     cleanupEmptyFolders(path.join(buildPath, 'node_modules'))
      //     .then(() => callback())
      //     .catch(error => callback(error))
      //   }
      // ],

      ignore:[
        '.commitlintrc.js',
        '.editorconfig',
        '.env.development',
        '.env.example',
        '.env.production',
        '.eslintrc.js',
        '.git',
        '.gitignore',
        '.husky',
        '.idea',
        '.yarn',
        '.yarnrc.yml',
        'assets',
        'forge.config.js',
        'jsconfig.json',
        'package-lock.json',
        'pnpm-lock.yaml',
        'src',
        'vite.preload-notify.config.mjs',
        'vite.preload.config.mjs',
        'vite.renderer-notify.config.mjs',
        'vite.renderer.config.mjs',
        'node_modules/fastify/test'
      ].map(x => new RegExp('^/' + x)),

    },

    

    rebuildConfig: {},
    makers: [
      // {
      //   name: '@electron-forge/maker-squirrel', // Windows Installer
      //   config: {
      //     name: 'FSTimelineViewer', // Application name in installer
      //   },
      //   platforms: ['win32'],
      // },
      // {
      //   name: '@electron-forge/maker-zip',     // macOS and Linux ZIP
      //   platforms: ['darwin', 'linux'],
      // },
      // {
      //   name: '@electron-forge/maker-deb',     // Linux DEB
      //   config: {},
      //   platforms: ['linux'],
      // },
      // {
      //   name: '@electron-forge/maker-rpm',     // Linux RPM
      //   config: {},
      //   platforms: ['linux'],
      // },
      {
        // https://www.electronforge.io/config/makers/flatpak
        // sudo apt install flatpak-builder flatpak elfutils
        // flatpak remote-add --if-not-exists --user flathub https://dl.flathub.org/repo/flathub.flatpakrepo

        name: '@electron-forge/maker-flatpak',
        config: {
          options: {
            categories: [
              'Utility',
            ],
          },
        },
        platforms: ['linux'],
      }
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