import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectImageCards } from "~/app/redux/selectors";
import {
  favouriteImageAction,
  unfavouriteImageAction,
  voteUpImageAction,
  voteDownImageAction
} from "~/app/redux/actions";

import { GalleryImageCard } from "../../components/GalleryImageCard";

import "./style.scss";

const ImageGrid: React.FC = () => {
  const dispatch = useDispatch();
  const images = useSelector(selectImageCards);

  const onFavouriteClick = (image: App.ImageCardData): void => {
    if (image.favourited) {
      dispatch(unfavouriteImageAction(image.imageId));
    }
    else {
      dispatch(favouriteImageAction(image.imageId));
    }
  };

  const onVoteUpClick = (image: App.ImageCardData): void => {
    dispatch(voteUpImageAction(image.imageId));
  };

  const onVoteDownClick = (image: App.ImageCardData): void => {
    dispatch(voteDownImageAction(image.imageId));
  };

  return (
    <div className={"image-grid-container"}>
      {images.map((image) => (
        <div className="image-grid-item-container" key={image.imageId}>
          <GalleryImageCard
            data={image}
            onFavouriteClick={(): void => { onFavouriteClick(image); }}
            onVoteUpClick={(): void => { onVoteUpClick(image); }}
            onVoteDownClick={(): void => { onVoteDownClick(image); }}
          />
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
