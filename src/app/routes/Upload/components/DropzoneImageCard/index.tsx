import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { isMobile } from "react-device-detect";

import { ImageCard } from "~/app/components/ImageCard";

import "./style.scss";

type DropzoneImageCardProps = {
  image: File | null;
  onSelect: (image: File) => void;
};

export const DropzoneImageCard: React.FC<DropzoneImageCardProps> = ({ image, onSelect }) => {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const onDropAccepted = useCallback((files: File[]) => {
    if (files.length > 0) {
      setSelectedImage(files[0]);
    }
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDropAccepted,
    accept: ["image/png", "image/jpeg"]
  });

  useEffect(() => {
    if (!image) {
      setSelectedImage(null);
    }
  }, [image]);

  useEffect(() => {
    if (selectedImage) {
      onSelect(selectedImage);
      const reader = new FileReader();
      reader.readAsDataURL(selectedImage);
      reader.onloadend = (event: ProgressEvent<FileReader>): void => {
        const { result } = event.target;
        if (typeof result === "string") {
          setImgSrc(result);
        }
      };
    }
    else {
      setImgSrc(null);
    }
  }, [selectedImage]);

  return (
    <div className="dropzone-image-card-container">
      <ImageCard
        src={imgSrc}
        renderPlaceholder={(): React.ReactElement => (
          <div className={"dropzone-container"} {...getRootProps()}>
            <input {...getInputProps()} />
            {
              
              <p>Drop your <b>cat image</b> here or {isMobile ? "tap to select from your device" : "click to select from your computer"}</p>
            }
          </div>
        )}
      />
    </div>
  );
};
