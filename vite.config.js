import { defineConfig } from 'vite'
import liveReload from 'vite-plugin-live-reload'
import preact from '@preact/preset-vite'

export default defineConfig({
  plugins: [
    preact(),
    liveReload([
      'public/index.php',
      // 'resources/app/**/*',
      'src/**/*.php',
    ]),
  ],
  base: 'development' === process.env.APP_ENV ? '/' : '/assets/',
  build: {
    outDir: 'public/assets',
    emptyOutDir: true,
    manifest: true,
    rollupOptions: {
      input: 'resources/app/main.js',
    },
  },
  server: {
    strictPort: true,
    port: 5133,
  },
})
