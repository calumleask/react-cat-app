import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { selectImages } from "~/app/redux/selectors";

import { ImageGrid } from "./components/ImageGrid";

const HomeRoute: React.FC = () => {
  const history = useHistory();

  const images = useSelector(selectImages);

  return (
    <>
      <h1>Images</h1>
      <button style={{ width: "100px" }} onClick={(): void => { history.push("/upload"); }}>{"Upload"}</button>
      <ImageGrid images={images}/>
    </>
  );
};

export default HomeRoute;
