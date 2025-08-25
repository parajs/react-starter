import { loadEnv, type UserConfig } from 'vite'
// import react from '@vitejs/plugin-react'
import react from '@vitejs/plugin-react-swc' 
import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer'
import svgr from "vite-plugin-svgr";


// https://vite.dev/config/


interface ConfigEnv {
  command: 'build' | 'serve'
  mode: string
  isSsrBuild: boolean
  isPreview: boolean
}

export default function defineProject({ command, mode, isSsrBuild, isPreview }: ConfigEnv): UserConfig {
  console.log('command:', command)
  console.log('mode:', mode)
  console.log('isSsrBuild:', isSsrBuild)
  console.log('isPreview:',  isPreview)
  const env = loadEnv(mode as string, process.cwd())
  console.log('env %O ', env)
  const { VITE_API_PREFIX, VITE_BASE_URL } = env

  return {
        plugins: [
        react(),
        tailwindcss(), 
        svgr(),
        visualizer(),
      ],
      server: {
          proxy: {
            [VITE_API_PREFIX]: {
              target: VITE_BASE_URL,
              changeOrigin: true,
              // rewrite: (path) => path.replace(/^\/api/, '')
            }
          }
      },
      build: {
          rollupOptions: {
            output: {
              manualChunks: {
                react: ["react", "react-dom"],
                reactRouter: ["react-router"],
                reactQuery: ["@tanstack/react-query", "@tanstack/react-query-devtools"],
                i18n: ["react-i18next", "i18next", "i18next-http-backend", "i18next-browser-languagedetector"],
                reactUse: ["react-use"],
                ui: [
                  "@radix-ui/react-slot",
                  "class-variance-authority",
                  "clsx",
                  "tailwind-merge",
                ],
              },
            },
          },
      },
      resolve: {
          alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
          }
        }
}}

