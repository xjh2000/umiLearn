import { defineConfig } from 'umi';


///<reference path="https://umijs.org/zh-CN/config"/>
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  dynamicImport: {}, 
  fastRefresh: {},
  mfsu: { production: {} },
  base:'/umi-learn/',
  publicPath: process.env.NODE_ENV === 'production' ? '/umi-learn/' : '/',
  outputPath:"build",
});
