import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: '今晚食乜餸 Kitchen Manager',
        short_name: 'Kitchen',
        description: 'AI-powered smart cooking assistant to manage your daily meals.',
        theme_color: '#ea580c',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'https://cdn-icons-png.flaticon.com/512/1046/1046777.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  server: {
    // AI Studio sets DISABLE_HMR to stop file watching during agent edits.
    hmr: process.env.DISABLE_HMR !== 'true',
  },
});
