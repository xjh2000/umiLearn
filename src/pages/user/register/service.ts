import { request } from "@/.umi/plugin-request/request";

export interface StateType {
  status?: "ok" | "error";
  currentAuthority?: "user" | "guest" | "admin";
}

export interface UserRegisterParams {
  mail: string;
  password: string;
  confirm: string;
}

export async function fakeRegister(params: UserRegisterParams) {
  return request("/api/register", {
    method: "POST",
    data: params,
  });
}
