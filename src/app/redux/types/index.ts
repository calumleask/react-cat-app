import { Action } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

export type ReduxThunkAction = ThunkAction<void, AppState, unknown, Action>;
export type ReduxThunkDispatch = ThunkDispatch<AppState, unknown, Action>;
