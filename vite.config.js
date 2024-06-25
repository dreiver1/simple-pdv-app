import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    https: {
      key: './certificate/private',
      cert: './certificate/certificate'
    }
  }
})
