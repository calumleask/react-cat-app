import { ReduxThunkAction } from "../types";

import {
  buildActionUpdateAllFavourites,
  buildActionFavouriteImageOptimistic,
  buildActionFavouriteImageAsyncComplete,
  buildActionUnfavouriteImageOptimistic,
  buildActionUnfavouriteImageAsyncComplete,
  buildActionAsyncBegin,
  buildActionAsyncError
} from "../reducers/FavouritesReducer";
import { selectUserSubId } from "../selectors";

import * as theCatApi from "~/app/api";

export const fetchFavouritesAction = (): ReduxThunkAction => (dispatch, getState): void => {
  const subId = selectUserSubId(getState());
  theCatApi.getFavourites({
    limit: 10,
    page: 0,
    sub_id: subId
  })
  .then((favourites) => {
    dispatch(buildActionUpdateAllFavourites(favourites));
  });
};

export const favouriteImageAction = (imageId: string): ReduxAction => {
  return buildActionFavouriteImageOptimistic(imageId);
};

export const favouriteImageAsyncApiAction = (imageId: string): ReduxThunkAction => (dispatch, getState): void => {
  dispatch(buildActionAsyncBegin(imageId));
  const subId = selectUserSubId(getState());
  theCatApi.favouriteImage(imageId, subId)
  .then((response) => {
    console.log(response.message);
    const favouriteId = typeof response.id === "number" ? response.id.toString() : response.id;
    dispatch(buildActionFavouriteImageAsyncComplete(imageId, favouriteId));
  })
  .catch(() => {
    dispatch(buildActionAsyncError(imageId));
  });
};

export const unfavouriteImageAction = (imageId: string): ReduxAction => {
  return buildActionUnfavouriteImageOptimistic(imageId);
};

export const unfavouriteImageAsyncApiAction = (imageId: string, favouriteId: string): ReduxThunkAction => (dispatch): void => {
  dispatch(buildActionAsyncBegin(imageId));
  theCatApi.unfavouriteImage(favouriteId)
  .then((response) => {
    console.log(response.message);
    dispatch(buildActionUnfavouriteImageAsyncComplete(imageId));
  })
  .catch(() => {
    dispatch(buildActionAsyncError(imageId));
  });
};
