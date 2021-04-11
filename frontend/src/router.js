import React, {useEffect} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './containers/home/index'
import {getCookie} from './service/cookie'
import {useSetting} from './provider/setting'

export default function Routes() {
  const [,dispatch] = useSetting()

  useEffect(() => {
    const walletId = getCookie('walletId')
    dispatch({type: 'SET', settingName: 'walletId', settingData: walletId})
  }, [])

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}
