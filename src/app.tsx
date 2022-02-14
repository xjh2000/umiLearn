import React from "react";
import { history } from "umi";
import {
  BasicLayoutProps,
  PageLoading,
  Settings as LayoutSettings,
} from "@ant-design/pro-layout";
import Footer from "@/components/Footer";
import RightContent from "@/components/RightContent";
import { tcbCurrentUserInfo } from "@/services/cloudbase/auth";

const loginPath = "/user/login";

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

// see https://umijs.org/zh-CN/plugins/plugin-initial-state
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const user = await tcbCurrentUserInfo();
      return { ...user };
    } catch (e) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果是登录页面，不执行
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: {},
    };
  }
  return {
    fetchUserInfo,
    settings: {},
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout = ({
  initialState,
}: {
  initialState: { settings?: LayoutSettings; currentUser?: API.CurrentUser };
}): BasicLayoutProps => {
  return {
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录 且 不在/user路径下 重定向到 login
      if (
        !initialState?.currentUser?.uid &&
        location.pathname.indexOf("/user") !== 0
      ) {
        history.push(loginPath);
      }
    },
    rightContentRender: () => <RightContent />,
    footerRender: () => <Footer />,
    pageTitleRender: false,
    ...initialState?.settings,
  };
};
