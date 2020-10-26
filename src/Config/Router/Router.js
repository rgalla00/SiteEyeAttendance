import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Login, SignUp, Dash, EditPost } from "../../Containers";

function MainRoute() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/dash" component={Dash} />
        <Route path="/edit-user" component={EditPost} />
      </Switch>
    </Router>
  );
}
export default MainRoute;
