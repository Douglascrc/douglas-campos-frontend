import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
 plugins: [react()],
 resolve: {
  alias: {
   '@': path.resolve(__dirname, './src'),
  },
 },
 build: {
  sourcemap: true,
  rollupOptions: {
   onLog(level, log, handler) {
    type LogCause = { message: string }; 
    const cause = log.cause as LogCause;
    if (cause && cause.message === 'Can\'t resolve original location of error.') {
     return;
    }
    handler(level, log);
   }
  }
 }, 
});
