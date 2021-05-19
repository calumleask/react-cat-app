import reducerRegistry from "~/common/redux/reducers/ReducerRegistry";
import { createActionTypes, createReducer } from "~/common/redux/utils";

/*
 *  Initial State
 */

type CounterReducerState = {
  count: number;
};

const initialState: CounterReducerState = {
  count: 0
};

/*
 *  Action Types
 */

const reducerName = "route";
const actionTypes = createActionTypes(reducerName, [
  "INCREMENT"
]);

/*
 *  Reducer
 */

const reducer = createReducer<CounterReducerState>(initialState, {
  [actionTypes.INCREMENT]: (state) => ({ ...state, count: ++state.count })
});

reducerRegistry.register(reducerName, reducer);

/*
 *  Action Builders
 */

export const buildActionIncrementCountRoute = (): ReduxAction => ({
  type: actionTypes.INCREMENT
});

/*
 *  Selectors
 */

const selectState = (state: AppState): CounterReducerState => <CounterReducerState> state[reducerName];
const selectCount = (state: AppState): number => selectState(state).count;

const selectors = {
  selectCount
};

export default {
  actionTypes,
  reducer,
  selectors
};
