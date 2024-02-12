import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/MERN_Simple_Bookstore/",
  plugins: [react()],
})
