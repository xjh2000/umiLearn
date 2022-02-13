import { Settings as LayoutSettings } from "@ant-design/pro-layout";

// layout static setting https://procomponents.ant.design/components/layout/#api
const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: "dark",
  layout: "mix",
  contentWidth: "Fluid",
  colorWeak: false,
  title: "start time",
  pwa: false,
  splitMenus: true,
  iconfontUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js",
};

export default Settings;
