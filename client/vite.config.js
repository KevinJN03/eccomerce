import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import mkcert from 'vite-plugin-mkcert';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        mkcert({ autoUpgrade: true, savePath: './cert/' }),
        svgr(),
        sentryVitePlugin({
            org: "kevin-jean",
            project: "javascript-react"
        }),
     
    ],

    server: {
        https: true,
    },

    base: './',
    mode: 'development',

    build: {
        sourcemap: true
    }
});