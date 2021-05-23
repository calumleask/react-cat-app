import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectIsUploading } from "~/app/redux/selectors";
import { uploadImageAction } from "~/app/redux/actions";

import { DropzoneImageCard } from "./components/DropzoneImageCard";
import { Button } from "react-bootstrap";

import "./style.scss";

const UploadRoute: React.FC = () => {
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const isUploading = useSelector(selectIsUploading);

  const onUploadClick = (): void => {
    if (selectedImage && !isUploading) {
      dispatch(uploadImageAction(selectedImage));
    }
  };

  const onRemoveClick = (): void => {
    setSelectedImage(null);
  };

  const buttonsDisabled = isUploading || selectedImage === null;

  return (
    <>
      <DropzoneImageCard
        image={selectedImage}
        onSelect={(image): void => { setSelectedImage(image); }}
      />
      <div className="button-container">
        <Button
          className="upload"
          disabled={buttonsDisabled}
          variant="outline-primary"
          size="sm"
          onClick={onUploadClick}
        >
          Upload
        </Button>
        <Button
          className="remove"
          disabled={buttonsDisabled}
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
