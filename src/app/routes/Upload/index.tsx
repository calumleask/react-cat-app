import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Alert, Spinner } from "react-bootstrap";

import { selectIsUploading, selectUploadComplete, selectUploadErrorMessage } from "~/app/redux/selectors";
import { uploadImageAction, resetUploadStateAction } from "~/app/redux/actions";

import { DropzoneImageCard } from "./components/DropzoneImageCard";
import { Button } from "react-bootstrap";

import "./style.scss";

const UploadRoute: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const isUploading = useSelector(selectIsUploading);
  const uploadComplete = useSelector(selectUploadComplete);
  const uploadErrorMessage = useSelector(selectUploadErrorMessage);

  useEffect(() => {
    return (): void => {
      dispatch(resetUploadStateAction());
    };
  }, []);

  useEffect(() => {
    const unblock = history.block(() => {
      if (!isUploading || window.confirm("Are you sure you want to leave the page while you are uploading an image?")) {
        unblock();
        return;
      }
      return false;
    });
    return (): void => {
      unblock();
    };
  }, [isUploading]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (uploadComplete) {
      timeout = setTimeout(() => {
        history.push("/");
      }, 3000);
    }
    return (): void => {
      clearTimeout(timeout);
    };
  }, [uploadComplete]);

  const onUploadClick = (): void => {
    if (selectedImage && !isUploading) {
      dispatch(uploadImageAction(selectedImage));
    }
  };

  const onRemoveClick = (): void => {
    dispatch(resetUploadStateAction());
    setSelectedImage(null);
  };

  const buttonsDisabled = isUploading || selectedImage === null;

  return (
    <>
      <DropzoneImageCard
        image={selectedImage}
        onSelect={(image): void => { setSelectedImage(image); }}
      />
      {
        uploadComplete ? (
          <>
            <Alert variant="success">
              <Alert.Heading>Purrrfect!</Alert.Heading>
              ...returning to Gallery
            </Alert>
          </>
        ) : (
          isUploading ? (
            <Alert variant="primary">
              <Spinner animation="border" variant="primary" size="sm" />
              Please wait while we verify your cat
            </Alert>
          ) : (
            <>
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
              {
                uploadErrorMessage ? (
                  <Alert variant="danger">
                    <Alert.Heading>Uh oh... we have a furball!</Alert.Heading>
                    {uploadErrorMessage}
                  </Alert>
                ) : null
              }
            </>
          )
        )
      }
    </>
  );
};

export default UploadRoute;
