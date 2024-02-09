import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa'
import path from 'path'

const manifestForPlugin: Partial<VitePWAOptions> = {
  registerType: 'autoUpdate',
  manifest: {
    name: 'Kumo tasks',
    short_name: 'KT',
    description: 'App para organizar tareas',
    icons: [
      {
        src: '/icon.png',
        sizes: '200x200',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
    theme_color: '#171717',
    background_color: '#e8ebf2',
    display: 'standalone',
    scope: '/',
    start_url: '/',
    orientation: 'portrait',
  },
}

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [react(), VitePWA(manifestForPlugin)],
})
