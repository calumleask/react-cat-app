import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";

import "./style.scss";

type ImageCardProps = {
  className?: string;
  src: string;
  renderPlaceholder?: () => React.ReactElement;
  renderBottom?: () => React.ReactElement;
};

export const ImageCard: React.FC<ImageCardProps> = ({ className, src, renderPlaceholder, renderBottom }) => {
  const imgRef = useRef<HTMLImageElement>();
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    if (src) {
      imgRef.current.src = src;
      imgRef.current.onload = (): void => {
        setImgLoaded(true);
      };
    }
    else {
      imgRef.current.src = "";
      setImgLoaded(false);
    }
  }, [src]);

  return (
    <div className={classNames("image-card-container", className)}>
      {
        !imgLoaded && renderPlaceholder
        ? (
          <div className="placeholder-relative-container-square">
            <div className="placeholder-absolute-container">
              {renderPlaceholder()}
            </div>
          </div>
        )
        : null
      }
      <img style={{ display: imgLoaded ? "initial" : "none" }} ref={imgRef}/>
      <div className="bottom-container">
        {renderBottom ? renderBottom() : null}
      </div>
    </div>
  );
};
