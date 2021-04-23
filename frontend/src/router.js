import React, {useEffect} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Safemoon from './containers/safemoon/index'
import Hoge from './containers/hoge/index'
import {SettingProvider} from './provider/setting'

export default function Routes() {

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <SettingProvider>
            <Safemoon />
          </SettingProvider>
        </Route>
        <Route exact path="/hoge">
          <SettingProvider>
            <Hoge />
          </SettingProvider>
        </Route>
      </Switch>
    </Router>
  );
}
