import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [
      react(), 
      tailwindcss(),
      babel({ presets: [reactCompilerPreset()] })],
    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
    },
    server: {
      proxy: {
        '/api': 'http://localhost:3001',
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
  };
});