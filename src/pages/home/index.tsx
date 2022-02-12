import { Link } from "umi";
import { PageContainer } from "@ant-design/pro-layout";
import React from "react";

export default function HomePage() {
  return (
    <PageContainer header={{ breadcrumb: {} }}>
      <h1>this is home</h1>
      <Link to="/cloudfunc">Go to cloudfunc</Link>
      <Link to="/user/register">Go to register page</Link>
    </PageContainer>
  );
}
