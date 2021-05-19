import React from "react";
import { useHistory } from "react-router-dom";

const AboutRoute: React.FC = () => {
  const history = useHistory();

  return (
    <>
      <h1>About</h1>
      <button onClick={(): void => { history.push("/"); }}>{"Home"}</button>
    </>
  );
};

export default AboutRoute;
