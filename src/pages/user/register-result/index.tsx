import { Button, Result } from "antd";
import { Link } from "umi";
import React from "react";
import type { RouteChildrenProps } from "react-router";

import styles from "./style.less";

const hash: Record<string, string> = {
  "qq.com": "https://mail.qq.com",
  "gmail.com": "https://mail.google.com",
  "sina.com": "https://mail.sina.com.cn",
  "163.com": "https://mail.163.com",
  "126.com": "https://mail.126.com",
  "yeah.net": "https://www.yeah.net/",
  "sohu.com": "https://mail.sohu.com/",
  "tom.com": "https://mail.tom.com/",
  "sogou.com": "https://mail.sogou.com/",
  "139.com": "https://mail.10086.cn/",
  "hotmail.com": "https://www.hotmail.com",
  "live.com": "https://login.live.com/",
  "live.cn": "https://login.live.cn/",
  "live.com.cn": "https://login.live.com.cn",
  "189.com": "https://webmail16.189.cn/webmail/",
  "yahoo.com.cn": "https://mail.cn.yahoo.com/",
  "yahoo.cn": "https://mail.cn.yahoo.com/",
  "eyou.com": "https://www.eyou.com/",
  "21cn.com": "https://mail.21cn.com/",
  "188.com": "https://www.188.com/",
  "foxmail.com": "https://www.foxmail.com",
};

const actions = (email: string) => {
  let urlSuffix = email.split("@").pop();
  return (
    <div className={styles.actions}>
      <a href={hash[urlSuffix as string]}>
        <Button size="large" type="primary">
          <span>查看邮箱</span>
        </Button>
      </a>
      <Link to={"/user/login"}>
        <Button size="large">登录</Button>
      </Link>
    </div>
  );
};

export type LocationState = Record<string, unknown>;

const RegisterResult: React.FC<RouteChildrenProps> = ({ location }) => {
  const email = location.state
    ? (location.state as LocationState).account
    : "xjhDesign@qq.com";
  return (
    <Result
      className={styles.registerResult}
      status="success"
      title={
        <div className={styles.title}>
          <span>你的账户：{email} 注册成功</span>
        </div>
      }
      subTitle="激活邮件已发送到你的邮箱中，邮件有效期为2小时。请及时登录邮箱，点击邮件中的链接激活帐户。"
      extra={actions(email as string)}
    />
  );
};

export default RegisterResult;
