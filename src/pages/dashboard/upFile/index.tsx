import * as React from "react";
import ProCard from "@ant-design/pro-card";
import { Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  myBeforeUpload,
  myCustomRequest,
} from "@/pages/dashboard/upFile/utils";
import { useModel } from "@@/plugin-model/useModel";

const UpFile: React.FC = () => {
  const { initialState } = useModel("@@initialState") as any;
  const userInfo = initialState.currentUser;

  const upConfig = {
    accept: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    customRequest: async (prop: any) => {
      return myCustomRequest(
        userInfo.uid,
        prop.file,
        prop.onError,
        prop.onProgress,
        prop.onSuccess
      );
    },
    beforeUpload: myBeforeUpload,
    multiple: true,
  };

  return (
    <ProCard>
      <Upload {...upConfig}>
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>
    </ProCard>
  );
};

export default UpFile;
