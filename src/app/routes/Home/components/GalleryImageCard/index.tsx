import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { BiUpArrow, BiDownArrow } from "react-icons/bi";

import { ImageCard } from "~/app/components/ImageCard";

import "./style.scss";

type ImageCardProps = {
  data: App.ImageCardData;
  onFavouriteClick: () => void;
  onVoteUpClick: () => void;
  onVoteDownClick: () => void;
};

export const GalleryImageCard: React.FC<ImageCardProps> = ({ data, onFavouriteClick, onVoteUpClick, onVoteDownClick }) => {
  return (
    <ImageCard
      className="gallery-image-card"
      src={data.url}
      renderBottom={(): React.ReactElement => (
        <>
          <button className="favourite" onClick={onFavouriteClick}>
            {data.favourited ? <FaHeart/> : <FaRegHeart/>}
          </button>
          <div>
            <button className="vote-up" onClick={onVoteUpClick}>
              <BiUpArrow/>
            </button>
            {data.score}
            <button className="vote-up" onClick={onVoteDownClick}>
              <BiDownArrow/>
            </button>
          </div>
        </>
      )}
    />
  );
};
