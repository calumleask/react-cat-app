import { Dispatch } from "redux";

import { buildActionIncrementCountRoute } from "../reducers/CountReducer";

export const incrementCountAction = (dispatch: Dispatch): void => {
  dispatch(buildActionIncrementCountRoute());
};
