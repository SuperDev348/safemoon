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
    <div className="navbar">
      <img src="images/logo.svg" id="logo" />
      <a>MOON</a>
      <b>TRACKER</b>
      <div className="menu">
        <span className="item">
          <Link to="/">safemoon</Link>
        </span>
        <span className="item">
          <Link to="/hoge">hoge</Link>
        </span>
        {/* <span>
          <Link to="/ass">ass</Link>
        </span>
        <span>
          <Link to="/dragon">space dragon</Link>
        </span>
        <span>
          <Link to="/charizoid">charizoid</Link>
        </span> */}
        <span id="beta">In beta testing</span>
      </div>
    </div>
  )
}
export default Nav
