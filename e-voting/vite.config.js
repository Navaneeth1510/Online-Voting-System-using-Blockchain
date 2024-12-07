import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import fs from 'fs';

export default defineConfig({
  plugins: [react()],
  server: {
    host: 'OnlineVotingSystem.com',
    port: 5173,
    https: {
      key: fs.readFileSync('key_no_pass.pem'), // Use the new key without a password
      cert: fs.readFileSync('cert.pem'), // Path to your certificate
    },
  },
});
