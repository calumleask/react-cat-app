import reducerRegistry from "~/common/redux/reducers/ReducerRegistry";
import { createActionTypes, createReducer } from "~/common/redux/utils";

/*
 *  Initial State
 */

type FavouriteData = {
  apiRequestInFlight: boolean;
  confirmedStatus: "FAVOURITED" | "UNFAVOURITED";
  desiredStatus: "FAVOURITED" | "UNFAVOURITED";
  favouriteId: string;
};

type FavouritesReducerState = Record<string, FavouriteData>;

const initialState: FavouritesReducerState = {};

/*
 *  Action Types
 */

const reducerName = "favourites";
const actionTypes = createActionTypes(reducerName, [
  "UPDATE_ALL_FAVOURITES",
  "FAVOURITE_OPTIMISITIC",
  "FAVOURITE_ASYNC_COMPLETE",
  "ASYNC_BEGIN",
  "ASYNC_ERROR"
]);

/*
 *  Reducer
 */

const reducer = createReducer<FavouritesReducerState>(initialState, {
  [actionTypes.UPDATE_ALL_FAVOURITES]: (_state, { payload }: UpdateAllFavouritesAction) => ({ ...payload.favourites }),
  [actionTypes.FAVOURITE_OPTIMISITIC]: (state, { payload }: FavouriteAction) => {
    return {
      ...state,
      [payload.imageId]: {
        ...state[payload.imageId],
        desiredStatus: payload.favourited ? "FAVOURITED" : "UNFAVOURITED"
      }
    };
  },
  [actionTypes.FAVOURITE_ASYNC_COMPLETE]: (state, { payload }: FavouriteConfirmedAction) => {
    return {
      ...state,
      [payload.imageId]: {
        ...state[payload.imageId],
        apiRequestInFlight: false,
        confirmedStatus: payload.favourited ? "FAVOURITED" : "UNFAVOURITED",
        favouriteId: payload.favouriteId
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
  favourited: boolean;
}>;

export const buildActionFavouriteOptimistic = (imageId: string, favourited: boolean): FavouriteAction => ({
  type: actionTypes.FAVOURITE_OPTIMISITIC,
  payload: { imageId, favourited }
});

type FavouriteConfirmedAction = ReduxAction<{
  imageId: string;
  favouriteId: string;
  favourited: boolean;
}>;

export const buildActionFavouriteAsyncComplete = (imageId: string, favourited: boolean, favouriteId = ""): FavouriteConfirmedAction => ({
  type: actionTypes.FAVOURITE_ASYNC_COMPLETE,
  payload: { imageId, favourited, favouriteId: favourited ? favouriteId : "" }
});

type FavouriteAsyncStatusAction = ReduxAction<{
  imageId: string;
}>;

export const buildActionAsyncBegin = (imageId: string): FavouriteAsyncStatusAction => ({
  type: actionTypes.ASYNC_BEGIN,
  payload: { imageId }
});

export const buildActionAsyncError = (imageId: string): FavouriteAsyncStatusAction => ({
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
