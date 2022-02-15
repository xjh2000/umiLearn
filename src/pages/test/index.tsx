import React from "react";
import { PageContainer } from "@ant-design/pro-layout";
import { Button } from "antd";
import { useModel } from "@@/plugin-model/useModel";
import moment from "moment";

const test: React.FC = () => {
  const { initialState, setInitialState } = useModel("@@initialState") as any;

  function testFunc() {
    let date = moment("2022-02-01");
    console.log(date);
    console.log(date.toDate().toLocaleDateString());
  }

  return (
    <PageContainer header={{ breadcrumb: {} }}>
      <Button onClick={testFunc}> test</Button>
    </PageContainer>
  );
};

export default test;
