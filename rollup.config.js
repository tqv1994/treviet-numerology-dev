import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import autoPreprocess from 'svelte-preprocess';
import postcss from 'rollup-plugin-postcss';
import replace from '@rollup/plugin-replace';
import { config } from 'dotenv';
import alias from "@rollup/plugin-alias";
import path from "path";
const projectRootDir = path.resolve(__dirname);

const production = !process.env.ROLLUP_WATCH;

const configToReplace = {};
for (const [key, v] of Object.entries(config().parsed)) {
    configToReplace[`process.env.${key}`] = `'${v}'`;
}
export default {
    input: 'src/main.ts',
    output: {
        sourcemap: true,
        format: 'iife',
        name: 'app',
        file: 'public/build/bundle.js'
    },
    plugins: [
        postcss({
            extensions: ['.css'],
        }),
        svelte({
            preprocess: autoPreprocess(),

            // Emit CSS as "files" for other plugins to process. default is true
            emitCss: false,

            // You can pass any of the Svelte compiler options
            preprocess: sveltePreprocess({ sourceMap: !production }),
            compilerOptions: {
                // enable run-time checks when not in production
                dev: !production,
                // we'll extract any component CSS out into
                // a separate file - better for performance
                css: css => {
                    css.write('public/build/bundle.css');
                },

                // You can optionally set 'customElement' to 'true' to compile
                // your components to custom elements (aka web elements)
                customElement: false
            },
        }),
        typescript(),

        // If you have external dependencies installed from
        // npm, you'll most likely need these plugins. In
        // some cases you'll need additional configuration -
        // consult the documentation for details:
        // https://github.com/rollup/plugins/tree/master/packages/commonjs
        resolve({
            browser: true,
            dedupe: ['svelte']
        }),
        commonjs(),
        typescript({
            sourceMap: !production,
            inlineSources: !production
        }),

        // In dev mode, call `npm run start` once
        // the bundle has been generated
        !production && serve(),

        // Watch the `public` directory and refresh the
        // browser on changes when not in production
        !production && livereload('public'),

        // If we're building for production (npm run build
        // instead of npm run dev), minify
        production && terser(),

        replace({
            preventAssignment: true,
            // stringify the object
            include: ["src/**/*.ts", "src/**/*.svelte"],
            preventAssignment: true,
            values: configToReplace
        }),

        alias({
            entries: [
                { find: "@layout", replacement: path.resolve(projectRootDir, 'src/layout') },
                { find: "@public", replacement: path.resolve(projectRootDir, 'public') },
                { find: "@app", replacement: path.resolve(projectRootDir, 'src/app') },
                { find: "@components", replacement: path.resolve(projectRootDir, 'src/components') },
                { find: "@util", replacement: path.resolve(projectRootDir, 'src/util') }
            ]
        })
    ],
    watch: {
        clearScreen: false,
        include: "public/global.css"
    }
};

// function serve() {
//     let started = false;

//     return {
//         writeBundle() {
//             if (!started) {
//                 started = true;

//                 require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
//                     stdio: ['ignore', 'inherit', 'inherit'],
//                     shell: true
//                 });
//             }
//         }
//     };
// }

function serve() {
    let server;

    function toExit() {
        if (server) server.kill(0);
    }

    return {
        writeBundle() {
            if (server) return;
            server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
                stdio: ['ignore', 'inherit', 'inherit'],
                shell: true
            });

            process.on('SIGTERM', toExit);
            process.on('exit', toExit);
        }
    };
}
