import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import HomeRoute from "~/app/routes/Home";
import UploadRoute from "~/app/routes/Upload";

import "./style.scss";

const App: React.FC = () => {
  return (
    <div className={"app-container"}>
      <Router>
        <Switch>
          <Route exact={true} path="/" component={HomeRoute}/>
          <Route exact={true} path="/upload" component={UploadRoute}/>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
