import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const payPalFriendlyHeaders = {
  'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
}

export default defineConfig({
  base: "/", // ✅ ADD THIS LINE
  plugins: [react()],
  server: {
    headers: payPalFriendlyHeaders,
  },
  preview: {
    headers: payPalFriendlyHeaders,
  },
})