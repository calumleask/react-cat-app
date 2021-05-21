import onStateChange, { OnStateChangeHandler } from "~/common/redux/middleware/OnStateChange";
import { ReduxThunkDispatch } from "../types";

import favouritesReducer, { FavouriteAction } from "../reducers/FavouritesReducer";
import { selectFavourites } from "../selectors";
import { favouriteImageAsyncApiAction, unfavouriteImageAsyncApiAction } from "../actions";

const StateChangedObserver: OnStateChangeHandler<ReduxThunkDispatch> = (_prevState, nextState, action, dispatch) => {

  switch (action.type) {

    case favouritesReducer.actionTypes.FAVOURITE_IMAGE_OPTIMISITIC: 
    case favouritesReducer.actionTypes.UNFAVOURITE_IMAGE_OPTIMISITIC: {
      const { payload } = action as FavouriteAction;
      const { imageId } = payload;
      const favourite = selectFavourites(nextState)[imageId];
      if (!favourite.apiRequestInFlight && favourite.desiredStatus !== favourite.confirmedStatus) {
        if (favourite.desiredStatus === "FAVOURITED") {
          dispatch(favouriteImageAsyncApiAction(imageId));
        }
        else {
          dispatch(unfavouriteImageAsyncApiAction(imageId, favourite.favouriteId));
        }
      }
      break;
    }

    case favouritesReducer.actionTypes.FAVOURITE_IMAGE_ASYNC_COMPLETE: 
    case favouritesReducer.actionTypes.UNFAVOURITE_IMAGE_ASYNC_COMPLETE: {
      const { payload } = action as FavouriteAction;
      const { imageId } = payload;
      const favourite = selectFavourites(nextState)[imageId];
      if (favourite.desiredStatus !== favourite.confirmedStatus) {
        if (favourite.desiredStatus === "FAVOURITED") {
          dispatch(favouriteImageAsyncApiAction(imageId));
        }
        else {
          dispatch(unfavouriteImageAsyncApiAction(imageId, favourite.favouriteId));
        }
      }
      break;
    }

    default:
      break;
  }
};

export default onStateChange(StateChangedObserver);
