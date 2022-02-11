import {defineConfig} from 'umi';
import chainWebpack from './chainWebpack';

///<reference path="https://umijs.org/zh-CN/config"/>
export default defineConfig({
    hash: true,
    nodeModulesTransform: {
        type: 'none',
    },
    fastRefresh: {},
    esbuild: {},
    webpack5: {},
    exportStatic: {},
    base: '/umi-learn/',
    publicPath: process.env.NODE_ENV === 'production' ? '/umi-learn/' : '/',
    outputPath: "build",
    dynamicImport: {},
    targets: {
        ie: 11,
    },
    mfsu:{},
    chunks: ['vendors', 'umi'],
    chainWebpack,
});
