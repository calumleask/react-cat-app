import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import HomeRoute from "~/app/routes/Home";
import AboutRoute from "~/app/routes/About";

import "./style.scss";

const App: React.FC = () => {
  return (
    <div className={"app-container"}>
      <Router>
        <Switch>
          <Route exact={true} path="/" component={HomeRoute}/>
          <Route exact={true} path="/about" component={AboutRoute}/>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
