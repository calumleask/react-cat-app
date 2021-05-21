import reducerRegistry from "~/common/redux/reducers/ReducerRegistry";
import { createActionTypes, createReducer } from "~/common/redux/utils";

/*
 *  Initial State
 */

type ImageData = {
  imageId: string;
  url: string;
};

type ImagesReducerState = ImageData[];

const initialState: ImagesReducerState = [];

/*
 *  Action Types
 */

const reducerName = "images";
const actionTypes = createActionTypes(reducerName, [
  "UPDATE_ALL_IMAGES"
]);

/*
 *  Reducer
 */

const reducer = createReducer<ImagesReducerState>(initialState, {
  [actionTypes.UPDATE_ALL_IMAGES]: (state, { payload }: UpdateAllImagesAction) => ([ ...payload.images ])
});

reducerRegistry.register(reducerName, reducer);

/*
 *  Action Builders
 */

type UpdateAllImagesAction = ReduxAction<{
  images: ImageData[];
}>;

export const buildActionUpdateAllImages = (images: TheCatApi.GetImagesResponseData): UpdateAllImagesAction => ({
  type: actionTypes.UPDATE_ALL_IMAGES,
  payload: {
    images: images.map((image) => ({ imageId: image.id, url: image.url }))
  }
});

/*
 *  Selector
 */

const selectState = (state: AppState): ImagesReducerState => state[reducerName];

export default {
  actionTypes,
  reducer,
  selectState
};
