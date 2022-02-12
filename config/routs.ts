import { MenuDataItem } from "@ant-design/pro-layout";

export const routes: MenuDataItem[] = [
  {
    path: "/home",
    name: "主页",
    icon: "project",
    component: "./home",
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
        path: "/user/register",
        component: "./user/register",
      },
    ],
  },
  {
    path: "/",
    redirect: "/home",
  },
];
