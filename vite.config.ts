/// <reference types="vitest" />

import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    css: {
      postcss: {
        plugins: [tailwindcss],
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './test-support/vitest-setup.ts',
      coverage: {
        all: false,
        include: ['src/**'],
      },
    },
    server: {
      proxy: {
        '/api': {
          target: env.PODCAST_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  }
})
