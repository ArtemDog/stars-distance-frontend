import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import mkcert from 'vite-plugin-mkcert'
import fs from 'fs';
import path from 'path';
import { dest_root, api_proxy_addr, img_proxy_addr } from './src/target_config'

// https://vite.dev/config/
export default defineConfig({
  base: dest_root,
  server: {
    port: 3000,
    proxy: {
      "/api-proxy": {
        target: api_proxy_addr,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-proxy/, ""),
      },
      "/img-proxy": {
        target: img_proxy_addr,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/img-proxy/, ""),
      },
    },
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'cert.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'cert.crt')),
    },
  },
  plugins: [
    react(),
    mkcert(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      workbox: {
        globPatterns: [],
      },
      manifest: {
        name: "Stars Distance",
        short_name: "SD",
        id: "/stars-distance-frontend/",
        start_url: "/stars-distance-frontend/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#000000",
        orientation: "portrait-primary",
        icons: [
          {
            "src": "./logo192.png",
            "type": "image/png",
            "sizes": "192x192"
          },
          {
            "src": "./logo512.png",
            "type": "image/png",
            "sizes": "512x512"
          }
        ],
        screenshots: [
          {
            "src": "./screenshots/screenshot-mobile.png",
            "sizes": "720x1280",
            "type": "image/png",
            "label": "Главный экран приложения"
          },
          {
            "src": "./screenshots/screenshot-wide.png",
            "sizes": "1280x720",
            "type": "image/png",
            "form_factor": "wide",
            "label": "Версия для компьютеров"
          }
        ]
      }
    }),
  ],
})
