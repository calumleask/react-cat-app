import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import { fetchImagesAction } from "~/app/redux/actions";

import Navbar from "~/app/components/Navbar";
import HomeRoute from "~/app/routes/Home";
import UploadRoute from "~/app/routes/Upload";

import "./style.scss";

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchImagesAction());
  }, []);

  return (
    <div className={"app-container"}>
      <Router>
        <Navbar/>
        <div className={"content-container"}>
          <Switch>
            <Route exact={true} path="/" component={HomeRoute}/>
            <Route exact={true} path="/upload" component={UploadRoute}/>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
