import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// PayPal’s checkout popup talks to the opener window. A strict default
// Cross-Origin-Opener-Policy can break that and look like an immediate sign-out
// after login. This is the common fix for embedded PayPal checkout.
const payPalFriendlyHeaders = {
  'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
}

export default defineConfig({
  plugins: [react()],
  server: {
    headers: payPalFriendlyHeaders,
  },
  preview: {
    headers: payPalFriendlyHeaders,
  },
})
