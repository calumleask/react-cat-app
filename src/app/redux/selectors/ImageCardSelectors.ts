import imagesReducer from "../reducers/ImagesReducer";
import favourtiesReducer from "../reducers/FavouritesReducer";
import votesReducer from "../reducers/VotesReducer";

import { selectUserSubId } from "~/app/redux/selectors";

export const selectImageCards = (state: AppState): App.ImageCardData[] => {
  const favourites = favourtiesReducer.selectState(state);
  const votes = votesReducer.selectState(state);
  const subId = selectUserSubId(state);
  return imagesReducer.selectState(state)
    .map(({ imageId, url, width, height }): App.ImageCardData => {
      const favourite = favourites[imageId] || null;
      const userVote = (votes[imageId] || {})[subId];
      const score = Object.values(votes[imageId] || {}).reduce<number>((acc, vote) => acc + (vote.desiredValue || -1), 0);
      return {
        imageId,
        url,
        favourited: favourite? (favourite.desiredStatus === "FAVOURITED") : false,
        ...(userVote ? { vote: userVote.desiredValue } : {}),
        score,
        width,
        height
      };
    });
};
