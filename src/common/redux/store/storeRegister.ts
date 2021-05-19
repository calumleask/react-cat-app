import { AnyAction, Store } from "redux";

let registeredStore: Store | undefined;

export const registerStore = (store: Store): void => {
  if (registeredStore) {
    throw Error("Redux store already registered.");
  }
  registeredStore = store;
};

export const getState = (): AppState => {
  return registeredStore?.getState();
};

export const dispatch = (action: AnyAction): void => {
  registeredStore?.dispatch(action);
};
