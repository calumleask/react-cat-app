import reducerRegistry from "~/common/redux/reducers/ReducerRegistry";
import { createReducer } from "~/common/redux/utils";
import queryStringParser from "~/common/utils/queryStringParser";



/*
 *  Initial State
 */

export const tryGetSubIdFromQueryString = (): string => {
  let numberId = queryStringParser.get("userId");
  if (/^[0-9]+$/.test(numberId) === false) {
    const defaultNumberId = "29478693";
    numberId = defaultNumberId;
  }
  return `User-${numberId}`;
};

type UserReducerState = {
  subId: string;
};

const initialState: UserReducerState = {
  subId: tryGetSubIdFromQueryString()
};

/*
 *  Reducer
 */

const reducerName = "user";
const reducer = createReducer<UserReducerState>(initialState, {});

reducerRegistry.register(reducerName, reducer);

/*
 *  Selector
 */

const selectState = (state: AppState): UserReducerState => <UserReducerState> state[reducerName];

export default {
  reducer,
  selectState
};
