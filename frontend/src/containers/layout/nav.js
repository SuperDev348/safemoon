import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions
} from '@material-ui/core'
import {Menu, Settings} from '@material-ui/icons'

import {useStyles} from '../style/material_ui_style'
import {useSetting} from '../../provider/setting'

function Nav() {
  const classes = useStyles()
  

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar variant="dense">
          <IconButton className={classes.button} edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography className={classes.title} variant="h6" color="inherit">
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}
export default Nav
