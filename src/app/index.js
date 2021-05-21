import React from "react";
import { render } from "react-dom";

import Root from "~/app/containers/Root";

import "bootstrap/dist/css/bootstrap.min.css";
import "~/app/style/main.scss";

render(
  <Root/>,
  document.getElementById("app")
);
