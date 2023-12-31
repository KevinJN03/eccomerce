import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import mkcert from 'vite-plugin-mkcert';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), mkcert({ autoUpgrade: true, savePath: './cert/' })],
    server: {
        https: true,
    },
    base: './',
    mode: 'development',
});
