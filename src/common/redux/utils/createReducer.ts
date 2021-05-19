import { Reducer } from "redux";

type ReducerHandlers<S> = Record<string, Reducer<S>>;

const createReducer = <S = ReducerState>(initialState: S, handlers: ReducerHandlers<S>): Reducer<S> => {
  return (state = initialState, action): S => {
    let newState = state;
    Object.keys(handlers).some(type => {
      if (type === action.type) {
        newState = handlers[type](state, action);
        return true;
      }
    });
    return newState;
  };
};

export default createReducer;
