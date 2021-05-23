import { ReduxThunkAction } from "../types";

import {
  buildActionAsyncBegin,
  buildActionAsyncError,
  buildActionImageUploadAsyncComplete
} from "../reducers/UploadReducer";

import { uploadImage } from "~/app/api";

export const uploadImageAction = (image: File): ReduxThunkAction => (dispatch, _getState): void => {
  dispatch(buildActionAsyncBegin());
  uploadImage(image)
  .then(() => {
    dispatch(buildActionImageUploadAsyncComplete());
  })
  .catch((err) => {
    console.log("err");
    console.log(err);
    dispatch(buildActionAsyncError());
  });
};
