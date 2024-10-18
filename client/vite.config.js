import { sentryVitePlugin } from '@sentry/vite-plugin';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import mkcert from 'vite-plugin-mkcert';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
    const env = loadEnv(mode, process.cwd());

    const { VITE_SENTRY_PROJECT, VITE_SENTRY_ORG, VITE_SENTRY_AUTH_TOKEN } =
        env;
    return {
        optimizeDeps: {
            esbuildOptions: {
                // Node.js global to browser globalThis
                define: {
                    global: 'globalThis',
                },
            },
        },
        plugins: [
            react(),
            // mkcert({ autoUpgrade: true, savePath: './cert/' }),
            svgr(),
            // sentryVitePlugin({
            //     org: VITE_SENTRY_ORG,
            //     project: VITE_SENTRY_PROJECT,
            //     authToken: VITE_SENTRY_AUTH_TOKEN,
            //     telemetry: false,
            // }),
        ],
        server: {
            //https: true
            historyApiFallback: true,
            watch: {
                usePolling: true
              }
        },
        // server: {
        //     //  https: true,
        //     port: 3000,
        //     host: true,
        //     esbuild: {
        //         target: 'esnext',
        //         platform: 'linux',
        //     },
        // },
        // preview: {
        //     port: 4000,
        // },
        // base: './',
        //  mode: 'development',
        // mode: 'production',
        build: {
            sourcemap: true,
            chunkSizeWarningLimit: 5000,
            // outDir: 'build',

        },
    };
});
