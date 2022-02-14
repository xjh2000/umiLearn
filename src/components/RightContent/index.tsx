// noinspection ES6ShorthandObjectProperty

import { Space } from "antd";
import React from "react";
import AvatarDropdown from "@/components/RightContent/AvatarDropdown";

export type SiderTheme = "light" | "dark";

const GlobalHeaderRight: React.FC = () => {
  return (
    <Space>
      <AvatarDropdown menu={true} />
    </Space>
  );
};

export default GlobalHeaderRight;
