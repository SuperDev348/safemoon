import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Button,
  
} from '@material-ui/core'
import {Menu, Settings} from '@material-ui/icons'

import {useStyles} from '../style/material_ui_style'

function Nav() {
  const classes = useStyles()
  
  return (
    <div class="navbar">
      <img src="images/logo.svg" id="logo" />
      <a>MOON</a>
      <b>TRACKER</b>
      <img src="images/settings.svg" id="settings" />
    </div>
  )
}
export default Nav
