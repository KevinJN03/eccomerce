import { sentryVitePlugin } from '@sentry/vite-plugin';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import mkcert from 'vite-plugin-mkcert';
import svgr from 'vite-plugin-svgr';
const { VITE_SENTRY_PROJECT, VITE_SENTRY_ORG, VITE_SENTRY_AUTH_TOKEN } =
    import.meta.env;
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        mkcert({ autoUpgrade: true, savePath: './cert/' }),
        svgr(),
        sentryVitePlugin({
            org: VITE_SENTRY_ORG,
            project: VITE_SENTRY_PROJECT,
            authToken: VITE_SENTRY_AUTH_TOKEN,
            telemetry: false,
        }),
    ],

    server: {
        https: true,
    },

    base: './',
    mode: 'development',

    build: {
        sourcemap: true,
    },
});
