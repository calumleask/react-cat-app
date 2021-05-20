import React from "react";

import "./style.scss";

type ImageGridProps = {
  images: TheCatApi.Image[];
};

export const ImageGrid: React.FC<ImageGridProps> = ({ images }) => {
  return (
    <div className={"image-grid-container"}>
      {images.map((item) => (
        <div className="image-grid-item-container" key={item.id}>
          <img src={item.url}/>
        </div>
      ))}
    </div>
  );
};
