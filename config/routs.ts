import { MenuDataItem } from "@ant-design/pro-layout";

export const routes: MenuDataItem[] = [
  {
    path: "/home",
    name: "主页",
    icon: "project",
    component: "./home",
  },
  {
    path: "/dashboard",
    name: "可视化",
    icon: "dashboard",
    routes: [
      {
        path: "/dashboard",
        redirect: "/dashboard/analysis",
      },
      {
        name: "分析",
        icon: "smile",
        path: "/dashboard/analysis",
        component: "./dashboard/analysis",
      },
      {
        name: "上传",
        icon: "upload",
        path: "/dashboard/upFile",
        component: "./dashboard/upFile",
      },
    ],
  },
  {
    path: "/test",
    name: "测试",
    icon: "experiment",
    component: "./test",
  },
  {
    path: "/user",
    layout: false,
    routes: [
      {
        path: "/user/login",
        component: "./user/login",
      },
      {
        path: "/user/register",
        component: "./user/register",
      },
      {
        path: "/user/register-result",
        component: "./user/register-result",
      },
      {
        component: "./404",
      },
    ],
  },
  {
    path: "/",
    redirect: "/home",
  },
  {
    component: "./404",
  },
];
