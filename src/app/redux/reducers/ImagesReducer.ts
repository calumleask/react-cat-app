import reducerRegistry from "~/common/redux/reducers/ReducerRegistry";
import { createActionTypes, createReducer } from "~/common/redux/utils";

/*
 *  Initial State
 */

type ImageData = {
  imageId: string;
  url: string;
  width: number;
  height: number;
};

type ImagesReducerState = ImageData[];

const initialState: ImagesReducerState = [];

/*
 *  Action Types
 */

const reducerName = "images";
const actionTypes = createActionTypes(reducerName, [
  "UPDATE_ALL_IMAGES",
  "ADD_IMAGE"
]);

/*
 *  Reducer
 */

const reducer = createReducer<ImagesReducerState>(initialState, {
  [actionTypes.UPDATE_ALL_IMAGES]: (_state, { payload }: UpdateAllImagesAction) => ([ ...payload.images ]),
  [actionTypes.ADD_IMAGE]: (state, { payload }: AddImageAction) => ([ payload.image, ...state ])
});

reducerRegistry.register(reducerName, reducer);

/*
 *  Action Builders
 */

type UpdateAllImagesAction = ReduxAction<{
  images: ImageData[];
}>;

export const buildActionUpdateAllImages = (images: TheCatApi.Image[]): UpdateAllImagesAction => ({
  type: actionTypes.UPDATE_ALL_IMAGES,
  payload: {
    images: images.map((image) => ({ imageId: image.id, url: image.url, width: image.width, height: image.height }))
  }
});

type AddImageAction = ReduxAction<{
  image: ImageData;
}>;

export const buildActionAddImage = (image: TheCatApi.Image): AddImageAction => ({
  type: actionTypes.ADD_IMAGE,
  payload: {
    image: { imageId: image.id, url: image.url, width: image.width, height: image.height }
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
