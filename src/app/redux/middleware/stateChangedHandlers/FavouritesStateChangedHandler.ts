import onStateChange, { OnStateChangeHandler } from "~/common/redux/middleware/OnStateChange";
import { ReduxThunkDispatch } from "../../types";

import favouritesReducer, { FavouriteAction } from "../../reducers/FavouritesReducer";
import { selectFavourites } from "../../selectors";
import { favouriteImageAsyncApiAction, unfavouriteImageAsyncApiAction } from "../../actions";

const FavouritesStateChangedHandler: OnStateChangeHandler<ReduxThunkDispatch> = (_prevState, nextState, action, dispatch) => {

  switch (action.type) {

    case favouritesReducer.actionTypes.FAVOURITE_OPTIMISITIC: 
    case favouritesReducer.actionTypes.FAVOURITE_ASYNC_COMPLETE: {
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

    default:
      break;
  }
};

export default onStateChange(FavouritesStateChangedHandler);
