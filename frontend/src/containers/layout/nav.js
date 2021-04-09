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
  const [setting, dispatch] = useSetting()
  const [modalActive, setModalActive] = React.useState(false)
  const [walletId, setWalletId] = useState('')

  const handleClickOpen = () => {
    setModalActive(true)
  }
  const handleClose = () => {
    setModalActive(false)
  }
  const handleSave = () => {
    dispatch({type: 'SET', settingName: 'walletId', settingData: walletId})
    setModalActive(false)
  }

  useEffect(() => {
    const tmp = setting?.walletId || ''
    // setWalletId(tmp)
  }, [setting])

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar variant="dense">
          <IconButton className={classes.button} edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography className={classes.title} variant="h6" color="inherit">
          </Typography>
          <IconButton className={classes.button} edge="start" color="inherit" aria-label="menu" onClick={handleClickOpen}>
            <Settings />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Dialog 
        disableBackdropClick
        disableEscapeKeyDown
        open={modalActive} 
        onClose={handleClose} 
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth='md'
      >
        <DialogTitle id="form-dialog-title">Settings</DialogTitle>
        <DialogContent>
          <DialogContentText>
            please enter wallet id in here
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Wallet Id"
            type="text"
            fullWidth
            autoComplete="off"
            value={walletId}
            onChange={(e) => setWalletId(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button className={classes.button} onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button className={classes.button} onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
export default Nav
