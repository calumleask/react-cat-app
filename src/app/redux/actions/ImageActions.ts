import { ReduxThunkAction } from "../types";

import { buildActionUpdateAllImages } from "../reducers/ImagesReducer";

import { getImages } from "~/app/api";

export const fetchImagesAction = (): ReduxThunkAction => (dispatch, _getState): void => {
  getImages()
  .then((images) => {
    dispatch(buildActionUpdateAllImages(images));
  })
  .catch((_errMessage) => {
    // console.log(_errMessage);
    // TODO: show error
  });
};
