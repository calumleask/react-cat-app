import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

import "./style.scss";

type ImageCardProps = {
  data: App.ImageCardData;
  onFavouriteClick: () => void;
};

export const ImageCard: React.FC<ImageCardProps> = ({ data, onFavouriteClick }) => {
  return (
    <div className="image-card-container">
      <img src={data.url}/>
      <div className="info-container">
        <button className="favourite" onClick={onFavouriteClick}>
          {data.favourited ? <FaHeart/> : <FaRegHeart/>}
        </button>
      </div>
    </div>
  );
};
