import {MenuDataItem} from "@ant-design/pro-layout";

export const routes: MenuDataItem [] = [
    {
        path: '/home',
        name: '主页',
        icon:'project',
        component: './home',
    },
    {
        path: '/cloudfunc',
        name: '测试',
        icon:'experiment',
        component: './cloudfunc',
    },
    {
        path: '/',
        redirect: '/home',
    },
]