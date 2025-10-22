import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test:{
    globals:true,
    environment:'jsdom',
    setupFiles:['./src/setupTest.js'],
    coverage:{
      enabled:true,
      provider:'v8',
      reporter:['html','text','json']
    }
  }
})

