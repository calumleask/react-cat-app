import imagesReducer from "../reducers/ImagesReducer";
import favourtiesReducer from "../reducers/FavouritesReducer";

export const selectImageCards = (state: AppState): App.ImageCardData[] => {
  const favourites = favourtiesReducer.selectState(state);
  return imagesReducer.selectState(state)
    .map((image): App.ImageCardData => {
      const favourite = favourites[image.imageId] || null;
      return {
        imageId: image.imageId,
        url: image.url,
        favourited: favourite? (favourite.desiredStatus === "FAVOURITED") : false 
      };
    });
};
