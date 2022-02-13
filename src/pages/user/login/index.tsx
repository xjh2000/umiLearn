import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { message } from "antd";
import React from "react";
import { LoginForm, ProFormText } from "@ant-design/pro-form";
import { history, Link, useModel } from "umi";
import Footer from "@/components/Footer";

import styles from "./index.less";
import {
  tcbCurrentUserInfo,
  tcbLoginWithEmail,
} from "@/services/cloudbase/auth";

// const LoginMessage: React.FC<{
//     content: string;
// }> = ({content}) => (
//     <Alert
//         style={{
//             marginBottom: 24,
//         }}
//         message={content}
//         type="error"
//         showIcon
//     />
// );

const Login: React.FC = () => {
  // const type = "account";
  const { setInitialState } = useModel("@@initialState") as any;

  const fetchUserInfo = async () => {
    const userInfo = await tcbCurrentUserInfo();
    if (JSON.stringify(userInfo) !== "{}") {
      await setInitialState((s: any) => ({
        ...s,
        currentUser: userInfo,
      }));
    }
  };

  const handleSubmit = async (values: API.LoginParams) => {
    try {
      // 登录
      const status = await tcbLoginWithEmail(values);
      if (status) {
        message.success("登录成功！");
        await fetchUserInfo();
        history.push("/home");
        return;
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          title="visual time"
          subTitle="to be simple"
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
        >
          <ProFormText
            name="email"
            fieldProps={{
              size: "large",
              prefix: <MailOutlined className={styles.prefixIcon} />,
            }}
            placeholder="邮箱"
            rules={[
              {
                required: true,
                message: "请输入邮箱!",
              },
            ]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: "large",
              prefix: <LockOutlined className={styles.prefixIcon} />,
            }}
            placeholder="密码"
            rules={[
              {
                required: true,
                message: "请输入密码!",
              },
            ]}
          />
          <Link to={"/user/register"}>注册</Link>
        </LoginForm>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
