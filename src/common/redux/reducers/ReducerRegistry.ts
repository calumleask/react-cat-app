import { Reducer, ReducersMapObject } from "redux";

type ChangeListener = (reducers: ReducersMapObject) => void;

class ReducerRegistry {
  private _reducers: ReducersMapObject;
  private _emitChange: ChangeListener;

  constructor() {
    this._reducers = {};
    this._emitChange = null;
  }

  getReducers(): ReducersMapObject {
    return { ...this._reducers };
  }

  register(name: string, reducer: Reducer): void {
    this._reducers = { ...this._reducers, [name]: reducer };
    if (this._emitChange) {
      this._emitChange(this.getReducers());
    }
  }

  setChangeListener(listener: ChangeListener): void {
    this._emitChange = listener;
  }
}

const reducerRegistry: ReducerRegistry = new ReducerRegistry();
export default reducerRegistry;
