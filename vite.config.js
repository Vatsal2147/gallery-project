import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', //fake browser environment for our tests to run
    setupFiles: './src/setup.js', //run setup file before testing
  },
})