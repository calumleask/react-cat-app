import { ReduxThunkAction } from "../types";

import { buildActionUpdateAllImages } from "../reducers/ImagesReducer";

import { getImages } from "~/app/api";

export const fetchImagesAction = (): ReduxThunkAction => (dispatch, _getState): void => {
  getImages()
  .then((images) => {
    dispatch(buildActionUpdateAllImages(images));
  })
  .catch((errMessage) => {
    console.log(errMessage);
    // TODO: show error
  });
};
