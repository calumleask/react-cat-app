import { ReduxThunkAction } from "../types";

import { buildActionUpdateAllImages } from "../reducers/ImagesReducer";

import { getImages } from "~/app/api";

export const fetchImagesAction = (): ReduxThunkAction => (dispatch, _getState): void => {
  getImages({
    limit: 20,
    page: 0,
    order: "ASC",
    sub_id: "",
    breed_ids: [],
    category_ids: [],
    original_filename: "",
    format: "json",
    include_vote: 1,
    include_favourite: 1
  })
  .then((images) => {
    dispatch(buildActionUpdateAllImages(images));
  });
};
