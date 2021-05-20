import { ReduxThunkAction } from "../types";

import { buildActionUpdateAllImages } from "../reducers/AppReducer";

import { getImages } from "~/app/api";

export const fetchImagesAction = (): ReduxThunkAction => (dispatch): void => {
  getImages({
    limit: 10,
    page: 1,
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
