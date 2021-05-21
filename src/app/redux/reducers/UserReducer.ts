import reducerRegistry from "~/common/redux/reducers/ReducerRegistry";
import { createReducer } from "~/common/redux/utils";

/*
 *  Initial State
 */

type UserReducerState = {
    subId: string;
};

const initialState: UserReducerState = {
    subId: "User-29478693"
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
