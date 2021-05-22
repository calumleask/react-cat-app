import imagesReducer from "../reducers/ImagesReducer";
import favourtiesReducer from "../reducers/FavouritesReducer";
import votesReducer from "../reducers/VotesReducer";

export const selectImageCards = (state: AppState): App.ImageCardData[] => {
  const favourites = favourtiesReducer.selectState(state);
  const votes = votesReducer.selectState(state);
  return imagesReducer.selectState(state)
    .map(({ imageId, url}): App.ImageCardData => {
      const favourite = favourites[imageId] || null;
      const score = Object.values(votes[imageId] || {}).reduce<number>((acc, vote) => acc + (vote.desiredValue || -1), 0);
      return {
        imageId,
        url,
        favourited: favourite? (favourite.desiredStatus === "FAVOURITED") : false,
        score
      };
    });
};
