// noinspection JSIgnoredPromiseFromCall

import type { FC } from "react";
import { useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Popover,
  Progress,
  Row,
} from "antd";
import type { Store } from "antd/es/form/interface";
import { history, Link } from "umi";

import styles from "./index.less";
import { tcbRegister } from "@/services/cloudbase/auth";
import { useRequest } from "@@/plugin-request/request";

const FormItem = Form.Item;
const passwordStatusMap = {
  ok: (
    <div className={styles.success}>
      <span>强度：强</span>
    </div>
  ),
  pass: (
    <div className={styles.warning}>
      <span>强度：中</span>
    </div>
  ),
  poor: (
    <div className={styles.error}>
      <span>强度：太短</span>
    </div>
  ),
};

const passwordProgressMap: {
  ok: "success";
  pass: "normal";
  poor: "exception";
} = {
  ok: "success",
  pass: "normal",
  poor: "exception",
};

const Register: FC = () => {
  const [visible, setVisible]: [boolean, any] = useState(false);
  const [popover, setPopover]: [boolean, any] = useState(false);
  const confirmDirty = false;
  const [form] = Form.useForm();

  const getPasswordStatus = () => {
    const value = form.getFieldValue("password");
    if (value && value.length > 9) {
      return "ok";
    }
    if (value && value.length > 5) {
      return "pass";
    }
    return "poor";
  };

  const { loading: submitting, run: register } = useRequest<any>(tcbRegister, {
    manual: true,
    throwOnError: true,
    onSuccess: (data: [any], params: any) => {
      message.success("注册成功！");
      history.push({
        pathname: "/user/register-result",
        state: {
          account: params.at(0).email,
        },
      });
    },
  });

  const onFinish = (values: Store) => {
    register(values).catch((e) => {
      message.error(e.message);
    });
  };

  const checkConfirm = (_: any, value: string) => {
    const promise = Promise;
    if (value && value !== form.getFieldValue("password")) {
      return promise.reject("两次输入的密码不匹配!");
    }
    return promise.resolve();
  };

  const checkPassword = (_: any, value: string) => {
    const promise = Promise;
    // 没有值的情况
    if (!value) {
      setVisible(!!value);
      return promise.reject("请输入密码!");
    }
    // 有值的情况
    if (!visible) {
      setVisible(!!value);
    }
    setPopover(!popover);
    if (value.length < 6) {
      return promise.reject("");
    }
    if (value && confirmDirty) {
      form.validateFields(["confirm"]);
    }
    return promise.resolve();
  };

  const renderPasswordProgress = () => {
    const value = form.getFieldValue("password");
    const passwordStatus = getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };

  return (
    <>
      <Row>
        <Col span={8}>
          <></>
        </Col>
        <Col span={8}>
          <Card title={"注册"} size={"small"}>
            <Form form={form} name="UserRegister" onFinish={onFinish}>
              <FormItem
                name="email"
                rules={[
                  {
                    required: true,
                    message: "请输入邮箱地址!",
                  },
                  {
                    type: "email",
                    message: "邮箱地址格式错误!",
                  },
                ]}
              >
                <Input size="large" placeholder="邮箱" />
              </FormItem>
              <Popover
                getPopupContainer={(node) => {
                  if (node && node.parentNode) {
                    return node.parentNode as HTMLElement;
                  }
                  return node;
                }}
                content={
                  visible && (
                    <div style={{ padding: "4px 0" }}>
                      {passwordStatusMap[getPasswordStatus()]}
                      {renderPasswordProgress()}
                      <div style={{ marginTop: 10 }}>
                        <span>
                          请至少输入 6 个字符。请不要使用容易被猜到的密码。
                        </span>
                      </div>
                    </div>
                  )
                }
                overlayStyle={{ width: 240 }}
                placement="right"
                visible={visible}
              >
                <FormItem
                  name="password"
                  className={
                    form.getFieldValue("password") &&
                    form.getFieldValue("password").length > 0 &&
                    styles.password
                  }
                  rules={[
                    {
                      validator: checkPassword,
                    },
                  ]}
                >
                  <Input
                    size="large"
                    type="password"
                    placeholder="至少6位密码，区分大小写"
                  />
                </FormItem>
              </Popover>
              <FormItem
                name="confirm"
                rules={[
                  {
                    required: true,
                    message: "确认密码",
                  },
                  {
                    validator: checkConfirm,
                  },
                ]}
              >
                <Input size="large" type="password" placeholder="确认密码" />
              </FormItem>
              <FormItem>
                <Row>
                  <Col flex={4}>
                    <Button
                      size="large"
                      loading={submitting}
                      className={styles.submit}
                      type="primary"
                      htmlType="submit"
                    >
                      <span>注册</span>
                    </Button>
                  </Col>
                  <Col flex={1}>
                    <Link className={styles.login} to="/user/login">
                      <span>使用已有账户登录</span>
                    </Link>
                  </Col>
                </Row>
              </FormItem>
            </Form>
          </Card>
        </Col>
        <Col span={8}>
          <></>
        </Col>
      </Row>
    </>
  );
};
export default Register;
