import React, { useState } from "react";
import { PageContainer } from "@ant-design/pro-layout";
import { tcbCallFunction } from "@/services/cloudbase/api";
import { Button, message } from "antd";
import {
  tcbCurrentUserInfo,
  tcbRegister,
  tcbSignOut,
} from "@/services/cloudbase/auth";
import { useModel } from "@@/plugin-model/useModel";
import _ from "lodash";

const test: React.FC = () => {
  const [cloudFunc, setCloudFunc] = useState("");
  const [authRegister, setAuthRegister] = useState("");
  const { initialState, setInitialState } = useModel("@@initialState") as any;

  const callFunction = async () => {
    try {
      const res = await tcbCallFunction("umi-learn", { foo: "bar" });
      setCloudFunc(JSON.stringify(res));
    } catch (e: any) {
      setCloudFunc(JSON.stringify(e));
    }
  };

  const authR = async () => {
    try {
      const res = await tcbRegister({
        email: "to_be_simple@126.com",
        password: "201007xjh",
        confirm: "201007xjh",
      });
      setAuthRegister(JSON.stringify(res));
    } catch (e: any) {
      setAuthRegister(JSON.stringify(e));
    }
  };

  const authU = async () => {
    try {
      const res = await tcbCurrentUserInfo();
      message.success(JSON.stringify(res));
    } catch (e: any) {
      message.error(e.message);
    }
  };

  return (
    <PageContainer header={{ breadcrumb: {} }}>
      <Button
        onClick={() => {
          callFunction();
        }}
      >
        cloudFunc
      </Button>
      <p>{cloudFunc}</p>
      <Button
        onClick={() => {
          authR();
        }}
      >
        authRegister
      </Button>
      <p>{authRegister}</p>

      <Button
        onClick={() => {
          authU();
        }}
      >
        userInfo
      </Button>
      <Button
        onClick={() => {
          console.log(initialState);
        }}
      >
        initialState
      </Button>
      <Button
        onClick={() => {
          tcbSignOut();
          setInitialState(_.omit(initialState, ["currentUser"]));
        }}
      >
        signOut
      </Button>
    </PageContainer>
  );
};

export default test;
