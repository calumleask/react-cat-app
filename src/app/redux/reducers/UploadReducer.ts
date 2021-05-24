import reducerRegistry from "~/common/redux/reducers/ReducerRegistry";
import { createActionTypes, createReducer } from "~/common/redux/utils";

/*
 *  Initial State
 */

type UploadReducerState = {
  uploading: boolean;
  uploaded: boolean;
  uploadErrorMessage: string;
};

const initialState: UploadReducerState = {
  uploading: false,
  uploaded: false,
  uploadErrorMessage: ""
};

/*
 *  Action Types
 */

const reducerName = "upload";
const actionTypes = createActionTypes(reducerName, [
  "IMAGE_UPLOAD_ASYNC_COMPLETE",
  "IMAGE_UPLOAD_ASYNC_BEGIN",
  "IMAGE_UPLOAD_ASYNC_ERROR",
  "RESET_UPLOAD_STATE"
]);

/*
 *  Reducer
 */

const reducer = createReducer<UploadReducerState>(initialState, {
  [actionTypes.IMAGE_UPLOAD_ASYNC_COMPLETE]: (state, { payload }: UploadAsyncCompleteAction) => (state.uploading ? { ...payload } : { ...state }),
  [actionTypes.IMAGE_UPLOAD_ASYNC_BEGIN]: (_state, { payload }: UploadAsyncBeginAction) => ({ ...payload }),
  [actionTypes.IMAGE_UPLOAD_ASYNC_ERROR]: (_state, { payload }: UploadAsyncErrorAction) => ({ ...payload }),
  [actionTypes.RESET_UPLOAD_STATE]: (_state, { payload }: ResetUploadStateAction) => ({ ...payload })
});

reducerRegistry.register(reducerName, reducer);

/*
 *  Action Builders
 */

type UploadAsyncCompleteAction = ReduxAction<UploadReducerState>;

export const buildActionImageUploadAsyncComplete = (): UploadAsyncCompleteAction => ({
  type: actionTypes.IMAGE_UPLOAD_ASYNC_COMPLETE,
  payload: {
    uploading: false,
    uploaded: true,
    uploadErrorMessage: ""
  }
});

type UploadAsyncBeginAction = ReduxAction<UploadReducerState>;

export const buildActionAsyncBegin = (): UploadAsyncBeginAction => ({
  type: actionTypes.IMAGE_UPLOAD_ASYNC_BEGIN,
  payload: {
    uploading: true,
    uploaded: false,
    uploadErrorMessage: ""
  }
});

type UploadAsyncErrorAction = ReduxAction<UploadReducerState>;

export const buildActionAsyncError = (errorMessage: string): UploadAsyncErrorAction => ({
  type: actionTypes.IMAGE_UPLOAD_ASYNC_ERROR,
  payload: {
    uploading: false,
    uploaded: false,
    uploadErrorMessage: errorMessage
  }
});

type ResetUploadStateAction = ReduxAction<UploadReducerState>;

export const buildResetUploadStateAction = (): ResetUploadStateAction => ({
  type: actionTypes.RESET_UPLOAD_STATE,
  payload: {
    uploading: false,
    uploaded: false,
    uploadErrorMessage: ""
  }
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
