import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectImageCards } from "~/app/redux/selectors";
import { favouriteImageAction, unfavouriteImageAction } from "~/app/redux/actions";

import { ImageCard } from "../../components/ImageCard";

import "./style.scss";

const ImageGrid: React.FC = () => {
  const dispatch = useDispatch();
  const images = useSelector(selectImageCards);

  const onFavouriteClick = (image: App.ImageCardData): void => {
    if (image.favourited) {
      dispatch(unfavouriteImageAction(image.imageId, image.favouriteId));
    }
    else {
      dispatch(favouriteImageAction(image.imageId));
    }
  };

  return (
    <div className={"image-grid-container"}>
      {images.map((image) => (
        <div className="image-grid-item-container" key={image.imageId}>
          <ImageCard
            data={image}
            onFavouriteClick={(): void => { onFavouriteClick(image); }}
          />
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
