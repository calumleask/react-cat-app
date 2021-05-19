import React from "react";
import { Store } from "redux";
import { Provider } from "react-redux";

export const withProvider = (
  Component: React.ComponentType, store: Store): React.FC => (): React.ReactElement => {
  return (
    <Provider store={store}>
      <Component/>
    </Provider>
  );
};
