import React from 'react'
import Routes from './router'
import "react-notifications/lib/notifications.css"
import { NotificationContainer } from "react-notifications"
import "react-datepicker/dist/react-datepicker.css"

import {SettingProvider} from './provider/setting'

const App = () => (
  <>
    <NotificationContainer />
    <SettingProvider>
      <Routes /> 
    </SettingProvider>
  </>
);

export default App;
