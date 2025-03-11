import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

// You need to resolve __dirname using import.meta.url in Vite
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const port = Number(env.VITE_PORT) || 3000

  return {
    plugins: [
      react(),
      legacy({
        targets: ['defaults', 'not IE 11'],
      }),
    ],
    base: env.VITE_BASE_PATH,
    server: {
      port,
      host: env.VITE_HOST_URL,
      open: true,
      strictPort: true,
      cors: {
        origin: env.VITE_BASE_API_URL,
      },
    },
    optimizeDeps: {
      include: [],
    },
    define: {
      'process.env': {
        ...env,
      },
      anotherVariable: {},
    },
    preview: {
      host: env.VITE_HOST_URL,
      port,
      strictPort: true,
      cors: {
        origin: env.VITE_HOST_URL,
      },
    },
    resolve: {
       alias: {
        '@': resolve(__dirname, './src/'),
        components: `${resolve(__dirname, './src/components/')}`,
        routes: `${resolve(__dirname, './src/routes/')}`,
        services: `${resolve(__dirname, './src/services/')}`,
        store: `${resolve(__dirname, './src/store/')}`,
        types: `${resolve(__dirname, './src/types/')}`,
        translation: `${resolve(__dirname, './src/translation/')}`,
        pages: `${resolve(__dirname, './src/pages/')}`,
        assets: `${resolve(__dirname, './src/assets/')}`,
        context: `${resolve(__dirname, './src/context/')}`,
        enums: resolve(__dirname, './src/types/enums'),
        schemas: `${resolve(__dirname, './src/schemas/')}`,
        layout: `${resolve(__dirname, './src/layout/')}`,
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          quietDeps: true,
          additionalData: `@use "@/assets/stylesheets/main.scss" as *;`,
          api: 'modern-compiler',
        },
      },
    },
  }
})
