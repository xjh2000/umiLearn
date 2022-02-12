import { useState } from "react";
import { PageContainer } from "@ant-design/pro-layout";
import { tcbCallFunction } from "@/services/cloudbase/api";
import { Button } from "antd";

export default function Hello() {
  const [cloudFunc, setCloudFunc] = useState("");

  const callFunction = async () => {
    try {
      const res = await tcbCallFunction("umi-learn", { foo: "bar" });
      setCloudFunc(JSON.stringify(res));
    } catch (e: any) {
      setCloudFunc(e.message);
    }
  };

  return (
    <PageContainer>
      <Button
        type="primary"
        onClick={(e) => {
          e.preventDefault();
          callFunction();
        }}
      >
        cloudFunc
      </Button>
      <p>{cloudFunc}</p>
    </PageContainer>
  );
}
