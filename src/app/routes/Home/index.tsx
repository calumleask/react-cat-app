import React from "react";
import { useHistory } from "react-router-dom";

const HomeRoute: React.FC = () => {
  const history = useHistory();

  return (
    <>
      <h1>Images</h1>
      <button onClick={(): void => { history.push("/upload"); }}>{"Upload"}</button>
    </>
  );
};

export default HomeRoute;
