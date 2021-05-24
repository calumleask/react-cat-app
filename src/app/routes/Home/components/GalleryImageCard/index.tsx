import React from "react";
import { Spinner } from "react-bootstrap";
import classNames from "classnames";
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
      srcWidth={data.width}
      srcHeight={data.height}
      renderPlaceholder={(): React.ReactElement => (
        <div className="placeholder">
          <Spinner animation="grow" variant="secondary" />
        </div>
      )}
      renderBottom={(): React.ReactElement => (
        <>
          <button
            title={data.favourited ? "unfavourite" : "favourite"}
            className={classNames("favourite", data.favourited ? "on" : "off")}
            onClick={onFavouriteClick}
          >
            {data.favourited ? <FaHeart/> : <FaRegHeart/>}
          </button>
          <div className="vote-buttons-container">
            <button
              title="vote up"
              className="vote-up"
              disabled={data.vote === 1}
              onClick={onVoteUpClick}
            >
              <BiUpArrow/>
            </button>
            {data.score}
            <button
              title="vote down"
              className="vote-up"
              disabled={data.vote === 0}
              onClick={onVoteDownClick}
            >
              <BiDownArrow/>
            </button>
          </div>
        </>
      )}
    />
  );
};
