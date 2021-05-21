import { ReduxThunkAction } from "../types";

import { buildActionUpdateAllImages } from "../reducers/ImagesReducer";
//import { selectUserSubId } from "../selectors";

import { getImages } from "~/app/api";

export const fetchImagesAction = (): ReduxThunkAction => (dispatch, _getState): void => {
  // TODO: use once images are uploaded with subId
  //const subId = selectUserSubId(getState());
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
