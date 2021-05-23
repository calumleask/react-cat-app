import reducerRegistry from "~/common/redux/reducers/ReducerRegistry";
import { createActionTypes, createReducer } from "~/common/redux/utils";

/*
 *  Initial State
 */

type UploadReducerState = {
  uploading: boolean;
};

const initialState: UploadReducerState = {
  uploading: false
};

/*
 *  Action Types
 */

const reducerName = "upload";
const actionTypes = createActionTypes(reducerName, [
  "IMAGE_UPLOAD_ASYNC_COMPLETE",
  "IMAGE_UPLOAD_ASYNC_BEGIN",
  "IMAGE_UPLOAD_ASYNC_ERROR"
]);

/*
 *  Reducer
 */

const reducer = createReducer<UploadReducerState>(initialState, {
  [actionTypes.IMAGE_UPLOAD_ASYNC_COMPLETE]: (state, { payload }) => ({ ...state }),
  [actionTypes.IMAGE_UPLOAD_ASYNC_BEGIN]: (state) => ({ ...state, uploading: true }),
  [actionTypes.IMAGE_UPLOAD_ASYNC_ERROR]: (state) => ({ ...state, uploading: false })
});

reducerRegistry.register(reducerName, reducer);

/*
 *  Action Builders
 */

type ImageUploadCompleteAction = ReduxAction<{
}>;

export const buildActionImageUploadAsyncComplete = (): ImageUploadCompleteAction => ({
  type: actionTypes.IMAGE_UPLOAD_ASYNC_COMPLETE
});

export const buildActionAsyncBegin = (): ReduxAction => ({
  type: actionTypes.IMAGE_UPLOAD_ASYNC_BEGIN
});

export const buildActionAsyncError = (): ReduxAction => ({
  type: actionTypes.IMAGE_UPLOAD_ASYNC_ERROR
});

/*
 *  Selector
 */

const selectState = (state: AppState): UploadReducerState => state[reducerName];

export default {
  actionTypes,
  reducer,
  selectState
};
