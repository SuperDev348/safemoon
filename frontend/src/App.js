import React from 'react'
import Routes from './router'
import "react-notifications/lib/notifications.css"
import { NotificationContainer } from "react-notifications"
import "react-datepicker/dist/react-datepicker.css"

const App = () => (
  <>
    <NotificationContainer />
      <Routes />
  </>
);

export default App;
