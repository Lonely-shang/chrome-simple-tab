import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import copy from 'rollup-plugin-copy'
import path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  root: 'src/popup',
  base: './',
  plugins: [
    vue(),
    vueJsx(),
    copy({
      targets: [{ src: 'public/manifest.json', dest: 'output' }],
      verbose: true
    })
  ],
  build: {
    sourcemap: false,
    outDir: path.resolve(__dirname, 'output'),
    assetsDir: './',
    rollupOptions: {
      input: {
        popup: path.resolve(__dirname, 'src/popup/index.html'),
        background: path.resolve(__dirname, 'src/background/main.ts')
      },
      output: {
        assetFileNames: '[name].[ext]',
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js'
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
