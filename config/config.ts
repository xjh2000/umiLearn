import {defineConfig} from 'umi';
import defaultSettings from './defaultSettings';
import chainWebpack from './webpack'

///<reference path="https://umijs.org/zh-CN/config"/>
export default defineConfig({


    antd: {
        mobile: true,
    },
    layout: {
        siderWidth: 208,
        ...defaultSettings,
    },

    hash: true,
    nodeModulesTransform: {
        type: 'none',
    },
    fastRefresh: {},
    esbuild: {},
    exportStatic: {},
    base: '/umi-learn/',
    publicPath: process.env.NODE_ENV === 'production' ? '/umi-learn/' : '/',
    outputPath: "build",
    targets: {
        ie: 11,
    },
    dynamicImport: {},
    mfsu: {production: {}},
    chainWebpack,
});
