import { ReduxThunkAction } from "../types";

import {
  buildActionAsyncBegin,
  buildActionAsyncError,
  buildActionImageUploadAsyncComplete,
  buildResetUploadStateAction
} from "../reducers/UploadReducer";

import { buildActionAddImage } from "../reducers/ImagesReducer";

import { uploadImage } from "~/app/api";

export const uploadImageAction = (image: File): ReduxThunkAction => (dispatch): void => {
  dispatch(buildActionAsyncBegin());
  uploadImage(image)
  .then((image) => {
    dispatch(buildActionImageUploadAsyncComplete());
    dispatch(buildActionAddImage(image));
  })
  .catch((errMessage: string) => {
    dispatch(buildActionAsyncError(errMessage));
  });
};

export const resetUploadStateAction = (): ReduxAction => buildResetUploadStateAction();
