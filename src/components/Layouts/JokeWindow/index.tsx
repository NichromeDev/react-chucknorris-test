import React from "react";
import { Spin } from "antd";

type Props = {
  loading: Boolean;
  text: String;
};

export default ({ loading, text }: Props): JSX.Element => (
  <div className="main-window">
    {loading ? <Spin size="default" /> : <span>{text}</span>}
  </div>
);
