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
  await myAuth.signInWithEmailAndPassword(
    <string>params.email,
    <string>params.password
  );
  return true;
}

export async function tcbCurrentUserInfo() {
  let user = await myAuth.getCurrenUser();
  return _.pick(user, userInfo) as API.CurrentUser;
}

export async function tcbSignOut() {
  return myAuth.signOut();
}
