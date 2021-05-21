import userReducer from "../reducers/UserReducer";

export const selectUserSubId = (state: AppState): string => userReducer.selectState(state).subId;
