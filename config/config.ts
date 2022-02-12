import { defineConfig } from "umi";
import defaultSettings from "./defaultSettings";
import chainWebpack from "./webpack";
import { routes } from "./routs";

///<reference path="https://umijs.org/zh-CN/config"/>
export default defineConfig({
  antd: {
    mobile: true,
  },
  layout: {
    siderWidth: 208,
    ...defaultSettings,
  },
  routes: routes,
  hash: true,
  nodeModulesTransform: {
    type: "none",
  },
  fastRefresh: {},
  esbuild: {},
  exportStatic: {},
  base: "/umi-learn/",
  publicPath: process.env.NODE_ENV === "production" ? "/umi-learn/" : "/",
  outputPath: "build",
  targets: {
    ie: 11,
  },
  dynamicImport: {},
  mfsu: { production: {} },
  chainWebpack,
});
