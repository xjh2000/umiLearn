import React from "react";
import {
  BasicLayoutProps,
  Settings as LayoutSettings,
} from "@ant-design/pro-layout";
import Footer from "@/components/Footer";
import RightContent from "@/components/RightContent";

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout = ({
  initialState,
}: {
  initialState: { settings?: LayoutSettings; currentUser?: any };
}): BasicLayoutProps => {
  return {
    onPageChange: () => {
      // const {currentUser} = initialState;
      // const {location} = history;
      // // 如果没有登录，重定向到 login
      // if (!currentUser && location.pathname !== '/user/login') {
      //     history.push('/user/login');
      // }
    },
    rightContentRender: () => <RightContent />,
    footerRender: () => <Footer />,
    headerTitleRender: false,
    ...initialState?.settings,
  };
};
