import React from "react";
import ReduxThunk from "redux-thunk";

import { createStore, withProvider } from "~/common/redux";

import stateChangedHandlers from "~/app/redux/middleware/stateChangedHandlers";

import App from "~/app/containers/App";

const Root: React.FC = () => (
  <App/>
);

export default withProvider(Root, createStore([ReduxThunk, ...stateChangedHandlers]));
