import React, { useState } from "react";

import { DropzoneImageCard } from "./components/DropzoneImageCard";
import { Button } from "react-bootstrap";

import "./style.scss";

const UploadRoute: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const onUploadClick = (): void => {
    // TODO
  };

  const onRemoveClick = (): void => {
    setSelectedImage(null);
  };

  return (
    <>
      <DropzoneImageCard
        image={selectedImage}
        onSelect={(image): void => { setSelectedImage(image); }}
      />
      <div className="button-container">
        <Button
          className="upload"
          disabled={selectedImage === null}
          variant="outline-danger"
          size="sm"
          onClick={onUploadClick}
        >
          Upload
        </Button>
        <Button
          className="remove"
          disabled={selectedImage === null}
          variant="outline-danger"
          size="sm"
          onClick={onRemoveClick}
        >
          Remove
        </Button>
      </div>
    </>
  );
};

export default UploadRoute;
