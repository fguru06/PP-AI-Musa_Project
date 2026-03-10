import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  base: '/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('firebase')) return 'firebase'
          if (id.includes('vue-router') || id.includes('pinia')) return 'vue-ecosystem'
          if (id.includes('jszip')) return 'jszip'
          if (id.includes('vue')) return 'vue-core'
        },
      },
    },
  },
})
