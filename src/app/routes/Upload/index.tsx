import React from "react";
import { useHistory } from "react-router-dom";

const UploadRoute: React.FC = () => {
  const history = useHistory();

  return (
    <>
      <h1>Upload</h1>
      <button onClick={(): void => { history.push("/"); }}>{"Images"}</button>
    </>
  );
};

export default UploadRoute;
