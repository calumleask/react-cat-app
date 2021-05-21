import reducerRegistry from "~/common/redux/reducers/ReducerRegistry";
import { createActionTypes, createReducer } from "~/common/redux/utils";

/*
 *  Initial State
 */

type FavouriteData = {
  apiRequestInFlight: boolean;
  confirmedStatus: "FAVOURITED" | "UNFAVOURITED";
  desiredStatus: "FAVOURITED" | "UNFAVOURITED";
  favouriteId: string | null;
};

type FavouritesReducerState = Record<string, FavouriteData>;

const initialState: FavouritesReducerState = {};

/*
 *  Action Types
 */

const reducerName = "favourites";
const actionTypes = createActionTypes(reducerName, [
  "UPDATE_ALL_FAVOURITES",
  "FAVOURITE_IMAGE_OPTIMISITIC",
  "FAVOURITE_IMAGE_ASYNC_COMPLETE",
  "UNFAVOURITE_IMAGE_OPTIMISITIC",
  "UNFAVOURITE_IMAGE_ASYNC_COMPLETE",
  "ASYNC_BEGIN",
  "ASYNC_ERROR"
]);

/*
 *  Reducer
 */

const reducer = createReducer<FavouritesReducerState>(initialState, {
  [actionTypes.UPDATE_ALL_FAVOURITES]: (_state, { payload }: UpdateAllFavouritesAction) => ({ ...payload.favourites }),
  [actionTypes.FAVOURITE_IMAGE_OPTIMISITIC]: (state, { payload }: FavouriteAction) => {
    return {
      ...state,
      [payload.imageId]: {
        ...state[payload.imageId],
        desiredStatus: "FAVOURITED"
      }
    };
  },
  [actionTypes.FAVOURITE_IMAGE_ASYNC_COMPLETE]: (state, { payload }: FavouriteConfirmedAction) => {
    return {
      ...state,
      [payload.imageId]: {
        ...state[payload.imageId],
        apiRequestInFlight: false,
        confirmedStatus: "FAVOURITED",
        favouriteId: payload.favouriteId
      }
    };
  },
  [actionTypes.UNFAVOURITE_IMAGE_OPTIMISITIC]: (state, { payload }: FavouriteAction) => {
    return {
      ...state,
      [payload.imageId]: {
        ...state[payload.imageId],
        desiredStatus: "UNFAVOURITED"
      }
    };
  },
  [actionTypes.UNFAVOURITE_IMAGE_ASYNC_COMPLETE]: (state, { payload }: FavouriteAction) => {
    return {
      ...state,
      [payload.imageId]: {
        ...state[payload.imageId],
        apiRequestInFlight: false,
        confirmedStatus: "UNFAVOURITED",
        favouriteId: null
      }
    };
  },
  [actionTypes.ASYNC_BEGIN]: (state, { payload }: FavouriteAction) => {
    return {
      ...state,
      [payload.imageId]: {
        ...state[payload.imageId],
        apiRequestInFlight: true
      }
    };
  },
  [actionTypes.ASYNC_ERROR]: (state, { payload }: FavouriteAction) => {
    return {
      ...state,
      [payload.imageId]: {
        ...state[payload.imageId],
        desiredStatus: state[payload.imageId].confirmedStatus,
        apiRequestInFlight: false
      }
    };
  }
});

reducerRegistry.register(reducerName, reducer);

/*
 *  Action Builders
 */

type UpdateAllFavouritesAction = ReduxAction<{
  favourites: Record<string, FavouriteData>;
}>;

export const buildActionUpdateAllFavourites = (favourites: TheCatApi.GetFavouritesResponseData): UpdateAllFavouritesAction => {
  const data: Record<string, FavouriteData> = {};
  favourites.forEach((favourite) => {
    data[favourite.image_id] = {
      apiRequestInFlight: false,
      confirmedStatus: "FAVOURITED",
      desiredStatus: "FAVOURITED",
      favouriteId: favourite.id
    };
  });
  
  return {
    type: actionTypes.UPDATE_ALL_FAVOURITES,
    payload: {
      favourites: data
    }
  };
};

export type FavouriteAction = ReduxAction<{
  imageId: string;
}>;

export const buildActionFavouriteImageOptimistic = (imageId: string): FavouriteAction => ({
  type: actionTypes.FAVOURITE_IMAGE_OPTIMISITIC,
  payload: { imageId }
});

type FavouriteConfirmedAction = ReduxAction<{
  imageId: string;
  favouriteId: string;
}>;

export const buildActionFavouriteImageAsyncComplete = (imageId: string, favouriteId: string): FavouriteConfirmedAction => ({
  type: actionTypes.FAVOURITE_IMAGE_ASYNC_COMPLETE,
  payload: { imageId, favouriteId }
});

export const buildActionUnfavouriteImageOptimistic = (imageId: string): FavouriteAction => ({
  type: actionTypes.UNFAVOURITE_IMAGE_OPTIMISITIC,
  payload: { imageId }
});

export const buildActionUnfavouriteImageAsyncComplete = (imageId: string): FavouriteAction => ({
  type: actionTypes.UNFAVOURITE_IMAGE_ASYNC_COMPLETE,
  payload: { imageId }
});

export const buildActionAsyncBegin = (imageId: string): FavouriteAction => ({
  type: actionTypes.ASYNC_BEGIN,
  payload: { imageId }
});

export const buildActionAsyncError = (imageId: string): FavouriteAction => ({
  type: actionTypes.ASYNC_ERROR,
  payload: { imageId }
});

/*
 *  Selector
 */

const selectState = (state: AppState): FavouritesReducerState => state[reducerName];

export default {
  actionTypes,
  reducer,
  selectState
};
