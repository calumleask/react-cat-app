import React from "react";
import { useSelector } from "react-redux";

import { selectImages } from "~/app/redux/selectors";

import { ImageGrid } from "./components/ImageGrid";

const HomeRoute: React.FC = () => {
  const images = useSelector(selectImages);

  return (
    <>
      <ImageGrid images={images}/>
    </>
  );
};

export default HomeRoute;
