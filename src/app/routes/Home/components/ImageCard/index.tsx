import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { BiUpArrow, BiDownArrow } from "react-icons/bi";

import "./style.scss";

type ImageCardProps = {
  data: App.ImageCardData;
  onFavouriteClick: () => void;
  onVoteUpClick: () => void;
  onVoteDownClick: () => void;
};

export const ImageCard: React.FC<ImageCardProps> = ({ data, onFavouriteClick, onVoteUpClick, onVoteDownClick }) => {
  return (
    <div className="image-card-container">
      <img src={data.url}/>
      <div className="info-container">
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
      </div>
    </div>
  );
};
