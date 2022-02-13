import { myAuth } from "@/services/cloudbase/api";
import _ from "lodash";

export const userInfo = [
  "name",
  "avatar",
  "nickName",
  "gender",
  "avatarUrl",
  "location",
  "username",
  "uid",
  "email",
  "loginType",
  "openid",
  "unionId",
  "wxOpenId",
  "wxPublicId",
  "customUserId",
  "qqMiniOpenId",
  "hasPassword",
];

export async function tcbRegister(params: API.UserRegisterParams) {
  return myAuth.signUpWithEmailAndPassword(params.email, params.password);
}

export async function tcbLoginWithEmail(params: API.LoginParams) {
  try {
    await myAuth.signInWithEmailAndPassword(
      <string>params.email,
      <string>params.password
    );
    return true;
  } catch (e) {
    throw e;
  }
}

export async function tcbCurrentUserInfo() {
  let user = await myAuth.getCurrenUser();
  return _.pick(user, userInfo) as any;
}

export async function tcbSignOut() {
  return await myAuth.signOut();
}
