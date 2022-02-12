// @ts-ignore
/* eslint-disable */
import { request } from "umi";
import tcb from "@cloudbase/js-sdk";

declare global {
  interface Window {
    _tcbEnv: any;
  }
}

// 将你的环境 Id 填写到此处
window._tcbEnv = window._tcbEnv || {
  TCB_ENV_ID: "visual-time-5gdiwp6tb894caff",
  TCB_REGION: "ap-shanghai",
};
export const envId = window._tcbEnv.TCB_ENV_ID;
export const region = window._tcbEnv.TCB_REGION;

const app = tcb.init({
  env: envId,
  region: region,
});

app.auth({
  persistence: "local",
});

export async function tcbCallFunction(name: string, data: any) {
  return app.callFunction({
    name: name,
    data: data,
  });
}

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser;
  }>("/api/currentUser", {
    method: "GET",
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>("/api/login/outLogin", {
    method: "POST",
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */
export async function login(
  body: API.LoginParams,
  options?: { [key: string]: any }
) {
  return request<API.LoginResult>("/api/login/account", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>("/api/notices", {
    method: "GET",
    ...(options || {}),
  });
}

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any }
) {
  return request<API.RuleList>("/api/rule", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>("/api/rule", {
    method: "PUT",
    ...(options || {}),
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>("/api/rule", {
    method: "POST",
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>("/api/rule", {
    method: "DELETE",
    ...(options || {}),
  });
}
