import React from "react";

import { createStore, withProvider } from "~/common/redux";

import App from "~/app/containers/App";

const Root: React.FC = () => (
  <App/>
);

export default withProvider(Root, createStore());
