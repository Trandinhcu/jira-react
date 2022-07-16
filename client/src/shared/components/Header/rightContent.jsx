import { Space, Button, Tooltip } from "antd";
import React, { useContext, useState } from "react";
import Avatar from "./avatar";
const GlobalHeaderRight = () => {
  return (
    <Space size={"middle"}>
      <Avatar className="ml-10" />
    </Space>
  );
};
export default GlobalHeaderRight;
