import reducerRegistry from "~/common/redux/reducers/ReducerRegistry";
import { createActionTypes, createReducer } from "~/common/redux/utils";

/*
 *  Initial State
 */

type AppReducerState = {
  images: TheCatApi.Image[];
};

const initialState: AppReducerState = {
  images: []
};

/*
 *  Action Types
 */

const reducerName = "app";
const actionTypes = createActionTypes(reducerName, [
  "UPDATE_ALL_IMAGES"
]);

/*
 *  Reducer
 */

const reducer = createReducer<AppReducerState>(initialState, {
  [actionTypes.UPDATE_ALL_IMAGES]: (state, { payload }) => ({ ...state, ...payload })
});

reducerRegistry.register(reducerName, reducer);

/*
 *  Action Builders
 */

type UpdateAllImagesAction = ReduxAction<{
  images: TheCatApi.Image[];
}>;

export const buildActionUpdateAllImages = (images: TheCatApi.Image[]): UpdateAllImagesAction => ({
  type: actionTypes.UPDATE_ALL_IMAGES,
  payload: {
    images: [...images]
  }
});

/*
 *  Selectors
 */

const selectState = (state: AppState): AppReducerState => <AppReducerState> state[reducerName];
const selectImages = (state: AppState): TheCatApi.Image[] => selectState(state).images;

const selectors = {
  selectImages
};

export default {
  actionTypes,
  reducer,
  selectors
};
