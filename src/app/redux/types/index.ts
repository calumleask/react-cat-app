import { Action } from "redux";
import { ThunkAction } from "redux-thunk";

export type ReduxThunkAction = ThunkAction<void, AppState, unknown, Action>;
