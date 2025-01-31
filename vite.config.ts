import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   port: 5173, // Set your desired port here
  // },
  // Can also set port in package.json scripts block: "dev": "vite --port 5173"
})
