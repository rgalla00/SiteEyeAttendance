import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Login, SignUp, Dash, EditPost, Verify, Faculty, EditClass, NewClass } from "../../Containers";

function MainRoute() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/dash" component={Dash} />
        <Route path="/edit-user" component={EditPost} />
        <Route path="/verify" component={Verify} />
        <Route path="/faculty" component={Faculty} />
        <Route path="/edit-class" component={EditClass} />
        <Route path="/new-class" component={NewClass} />
      </Switch>
    </Router>
  );
}
export default MainRoute;
