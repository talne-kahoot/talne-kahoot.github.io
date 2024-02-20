import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {VitePWA, VitePWAOptions} from "vite-plugin-pwa";


// https://vitejs.dev/config/
const manifestForPlugin: Partial<VitePWAOptions> = {
  registerType: "prompt",
  includeAssets: ["android-chrome-192x192.png", "android-chrome-512x512.png", "favicon.ico", "apple-touch-icon.png"],
  manifest: {
    name: "Talne Kahoot",
    short_name: "Kahoot",
    description: "Kahoot for Talne Church",
    icons: [
      {src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png"},
      {src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png"},
      {src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png", purpose: "maskable"}
    ],
    screenshots: [
      {src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png", form_factor: "narrow", label: "Kahoot"}
    ],
    theme_color: "#171717",
    background_color: "#e8ebf2",
    display: "standalone",
    id: '/',
    scope: "/",
    start_url: "/",
    orientation: "portrait",
  },
  devOptions : {
    enabled: true
  }
};

export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugin)],
  base: '/'
})
