import { ReduxThunkAction } from "../types";

import {
  buildActionUpdateAllFavourites,
  buildActionFavouriteOptimistic,
  buildActionFavouriteAsyncComplete,
  buildActionAsyncBegin,
  buildActionAsyncError
} from "../reducers/FavouritesReducer";
import { selectUserSubId } from "../selectors";

import * as theCatApi from "~/app/api";

export const fetchFavouritesAction = (): ReduxThunkAction => (dispatch, getState): void => {
  const subId = selectUserSubId(getState());
  theCatApi.getFavourites({ sub_id: subId })
  .then((favourites) => {
    dispatch(buildActionUpdateAllFavourites(favourites));
  })
  .catch((errMessage) => {
    console.log(errMessage);
    // TODO: show error
  });
};

export const favouriteImageAction = (imageId: string): ReduxAction =>  buildActionFavouriteOptimistic(imageId, true);

export const unfavouriteImageAction = (imageId: string): ReduxAction => buildActionFavouriteOptimistic(imageId, false);

export const favouriteImageAsyncApiAction = (imageId: string): ReduxThunkAction => (dispatch, getState): void => {
  dispatch(buildActionAsyncBegin(imageId));
  const subId = selectUserSubId(getState());
  theCatApi.favouriteImage(imageId, subId)
  .then((response) => {
    console.log(response.message);
    const favouriteId = typeof response.id === "number" ? response.id.toString() : response.id;
    dispatch(buildActionFavouriteAsyncComplete(imageId, true, favouriteId));
  })
  .catch((errMessage) => {
    console.log(errMessage);
    // TODO: show error
    dispatch(buildActionAsyncError(imageId));
  });
};

export const unfavouriteImageAsyncApiAction = (imageId: string, favouriteId: string): ReduxThunkAction => (dispatch): void => {
  dispatch(buildActionAsyncBegin(imageId));
  theCatApi.unfavouriteImage(favouriteId)
  .then((response) => {
    console.log(response.message);
    dispatch(buildActionFavouriteAsyncComplete(imageId, false));
  })
  .catch((errMessage) => {
    console.log(errMessage);
    // TODO: show error
    dispatch(buildActionAsyncError(imageId));
  });
};
