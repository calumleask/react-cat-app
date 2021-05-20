import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { selectImages } from "~/app/redux/selectors";

const HomeRoute: React.FC = () => {
  const history = useHistory();

  const images = useSelector(selectImages);

  return (
    <>
      <h1>Images</h1>
      <button onClick={(): void => { history.push("/upload"); }}>{"Upload"}</button>
      {images.map((image, index) => (
        <img key={index} src={image.url}/>
      ))}
    </>
  );
};

export default HomeRoute;
