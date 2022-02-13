import React from "react";
import { history } from "umi";
import {
  BasicLayoutProps,
  Settings as LayoutSettings,
} from "@ant-design/pro-layout";
import Footer from "@/components/Footer";
import RightContent from "@/components/RightContent";
import { tcbCurrentUserInfo } from "@/services/cloudbase/auth";

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout = ({
  initialState,
}: {
  initialState: { settings?: LayoutSettings; currentUser?: API.CurrentUser };
}): BasicLayoutProps => {
  return {
    onPageChange: () => {
      const { currentUser } = initialState;
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!currentUser && location.pathname.indexOf("/user") !== 0) {
        history.push("/user/login");
      }
    },
    rightContentRender: () => <RightContent />,
    footerRender: () => <Footer />,
    pageTitleRender: false,
    headerTitleRender: false,
    ...initialState?.settings,
  };
};

//TODO runtime initialState -- glob variable

// see https://umijs.org/zh-CN/plugins/plugin-initial-state
export async function getInitialState() {
  try {
    const user = await tcbCurrentUserInfo();
    if (JSON.stringify(user) !== "{}") {
      return { currentUser: user };
    }
    return {};
  } catch (e) {
    return {};
  }
}
