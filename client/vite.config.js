import { sentryVitePlugin } from '@sentry/vite-plugin';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import mkcert from 'vite-plugin-mkcert';
import svgr from 'vite-plugin-svgr';
import tailwind from "tailwindcss";
import autoprefixer from "autoprefixer";

import commonjs from 'vite-plugin-commonjs'
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
    const env = loadEnv(mode, process.cwd());

    const { VITE_SENTRY_PROJECT, VITE_SENTRY_ORG, VITE_SENTRY_AUTH_TOKEN } =
        env;

    console.log({ vite_env_start: env });
    return {
        base: '/',
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
            commonjs(),
            // mkcert({ autoUpgrade: true, savePath: './cert/' }),
            svgr(),
            // sentryVitePlugin({
            //     org: VITE_SENTRY_ORG,
            //     project: VITE_SENTRY_PROJECT,
            //     authToken: VITE_SENTRY_AUTH_TOKEN,
            //     telemetry: false,
            // }),
        ],
        css: {
            postcss: {
              plugins: [tailwind, autoprefixer],
            }
          }, 
        server: {
            //https: true
            historyApiFallback: true,
            watch: {
                usePolling: true,
            },
            // host: true,
            // port: 80,
        },
        preview: {
            port: 80,
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
          //  sourcemap: true,
           // chunkSizeWarningLimit: 5000,
            // outDir: 'build',
        },
    };
});
