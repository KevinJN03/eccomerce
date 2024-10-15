import { sentryVitePlugin } from '@sentry/vite-plugin';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import mkcert from 'vite-plugin-mkcert';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd());

    const { VITE_SENTRY_PROJECT, VITE_SENTRY_ORG, VITE_SENTRY_AUTH_TOKEN } =
        env;
    return {
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
        preview: {
            port: 4000
          },
        base: './',
        mode: 'development',

        build: {
            sourcemap: true,
        },
    };
});
