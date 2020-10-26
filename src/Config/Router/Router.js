import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Login, Dashbaord, EditPost  } from "../../Containers";

function MainRoute() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/dashboard" component={Dashbaord} />
        <Route path="/edit-user" component={EditPost} />
      </Switch>
    </Router>
  );
}
export default MainRoute;
