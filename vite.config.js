import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), tailwindcss()],
    build: {
      chunkSizeWarningLimit: 900,
    },
    // Local development with the auth server (e.g. `vercel dev` on :3000): proxy /api so the
    // SameSite=Strict refresh cookie stays same-origin with the app.
    server: env.DEV_API_TARGET ? { proxy: { '/api': { target: env.DEV_API_TARGET } } } : undefined,
  };
});
