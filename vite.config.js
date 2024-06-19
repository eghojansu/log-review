import { defineConfig } from 'vite'
import liveReload from 'vite-plugin-live-reload'
import preact from '@preact/preset-vite'

// Should same with configured in config.ini
const VITE_PORT = 5133
const VITE_ASSET = 'assets'

export default defineConfig({
  plugins: [
    preact(),
    liveReload([
      './public/index.php',
      './src/**/*.php',
    ]),
  ],
  root: '.',
  build: {
    outDir: 'public',
    assetsDir: VITE_ASSET,
    emptyOutDir: false,
    manifest: 'manifest.json',
    rollupOptions: {
      input: './resources/app/main.js',
    },
  },
  publicDir: false,
  server: {
    strictPort: true,
    port: VITE_PORT,
  },
})
