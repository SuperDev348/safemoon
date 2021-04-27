import React, {useEffect} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Safemoon from './containers/safemoon/index'
import Hoge from './containers/hoge/index'
import Ass from './containers/ass/index'
import SpaceDragon from './containers/dragon/index'
import Charizoid from './containers/charizoid/index'
import {SettingProvider} from './provider/setting'
import {SafemoonSettingProvider} from './provider/safemoon'
import {HogeSettingProvider} from './provider/hoge'

export default function Routes() {

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <SafemoonSettingProvider>
            <Safemoon />
          </SafemoonSettingProvider>
        </Route>
        <Route exact path="/hoge">
          <HogeSettingProvider>
            <Hoge />
          </HogeSettingProvider>
        </Route>
        <Route exact path="/ass">
          <SettingProvider>
            <Ass />
          </SettingProvider>
        </Route>
        <Route exact path="/dragon">
          <SettingProvider>
            <SpaceDragon />
          </SettingProvider>
        </Route>
        <Route exact path="/charizoid">
          <SettingProvider>
            <Charizoid />
          </SettingProvider>
        </Route>
      </Switch>
    </Router>
  );
}
