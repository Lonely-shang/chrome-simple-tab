import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import copy from 'rollup-plugin-copy'
import path from 'node:path'
import topLevelAwait from 'vite-plugin-top-level-await'

// https://vitejs.dev/config/
export default defineConfig({
  root: 'src/',
  base: './',
  plugins: [
    vue(),
    vueJsx(),
    topLevelAwait(),
    copy({
      targets: [
        { src: 'public/manifest.json', dest: 'output' },
        { src: 'src/assets/logo.png', dest: 'output/icon' },
        { src: 'public/favicon.ico', dest: 'output' }
      ],
      verbose: true
    })
  ],
  server: {
    proxy: {
      '/bing': {
        target: 'https://cn.bing.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/bing/, '')
      }
    }
  },
  build: {
    sourcemap: false,
    outDir: path.resolve(__dirname, 'output'),
    assetsDir: './',
    rollupOptions: {
      input: {
        popup: path.resolve(__dirname, 'src/pages/popup/popup.html'),
        tab: path.resolve(__dirname, 'src/pages/tab/tab.html'),
        options: path.resolve(__dirname, 'src/pages/options/options.html'),
        background: path.resolve(__dirname, 'src/background/main.ts'),
        content: path.resolve(__dirname, 'src/content/content-script.ts')
      },
      output: {
        assetFileNames: '[name].[ext]',
        entryFileNames: '[name]/[name].js',
        chunkFileNames: '[name]/[name].js'
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
