import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './containers/home'

export default function Routes() {
    return (
      <Router>
        <Route exact path="/" component={Home}>
        </Route>
      </Router>
    );
}
