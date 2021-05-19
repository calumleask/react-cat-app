import { combineReducers, createStore, applyMiddleware } from "redux";
import { Middleware, Reducer, ReducersMapObject, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

import { registerStore } from "./storeRegister";
import reducerRegistry from "../reducers/ReducerRegistry";

const initialState: AppState = {};

const combine = (reducers: ReducersMapObject): Reducer => {
  const reducerNames = Object.keys(reducers);
  Object.keys(initialState).forEach(item => {
    if (reducerNames.indexOf(item) === -1) {
      reducers[item] = (state: ReducerState = null): ReducerState => state;
    }
  });
  return combineReducers(reducers);
};

export const create = (middlewares?: Middleware[] | Middleware): Store => {
  const reducer = combine(reducerRegistry.getReducers());
  const enhancer = middlewares
    ? composeWithDevTools(applyMiddleware(
      ...(!Array.isArray(middlewares) ? [middlewares] : middlewares)
    ))
    : composeWithDevTools();
  const store = createStore(reducer, enhancer);
  registerStore(store);

  reducerRegistry.setChangeListener((reducers: ReducersMapObject) => {
    store.replaceReducer(combine(reducers));
  });

  return store;
};
