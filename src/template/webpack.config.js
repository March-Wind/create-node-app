import path from 'path'
import babelConfig from './babel.config.js';
const webpackConfig = {
    entry: './src/index.ts',
    devtool: 'source-map',
    mode: 'development',
    target: "node",
    output: {
        filename: '[name].cjs',
        path: path.resolve(process.cwd(), `dist`),
        // path: 'dist2',
        // libraryTarget: "umd",
        // globalObject: "this",
        // library: {
        //     name: '[name]',
        //     type: 'commonjs',
        //     // export: 'default',
        // },
        clean: true,
    },
    
    resolve: {
        extensions: ['.tsx', '.ts', '.js', 'jsx']
    },
    // externals: [nodeExternals()], // 为了不把node_modules目录下的第三方模块打包进输出文件中,因为nodejs默认会去node_modules目录下去寻找和使用第三方模块。
    // optimization: {
    //     splitChunks: {
    //         cacheGroups: {
    //             styles: {
    //                 name: "styles",
    //                 type: "css/mini-extract",
    //                 chunks: "all",
    //                 enforce: true,
    //             },
    //         },
    //     },
    // },
    module:{
      rules:[
        {oneOf: [
          {
            test: /\.(js|ts|jsx|tsx)$/,
            exclude: /node_modules/,
            use: [
                {
                loader: "babel-loader",
                options:
                {
                    // cacheDirectory: process.env.NODE_ENV === 'development', // 在dev开发环境开始缓存
                    ...babelConfig
                }
            }]
        },
        ]}
      ]
    }

}

export default webpackConfig;