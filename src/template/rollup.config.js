import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
// import globals from 'rollup-plugin-node-globals'; // 加global前缀
// import nodePolyfills from 'rollup-plugin-node-polyfills';
export default {
    input: 'src/index.ts',
    // external:['react'],
    output: {
        file: 'dist/index.cjs',
        inlineDynamicImports: true,
        format: 'cjs',
        // globals: {
        //     react: 'React'
        // },
        banner: '#!/usr/bin/env node'
    },
    plugins: [
        typescript(),
        nodeResolve({
            // preferBuiltins: false
        }), // or `true`
        commonjs(),
    ],
};
// 