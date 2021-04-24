import React, {useState, useEffect, useMemo} from 'react'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions
} from '@material-ui/core'
import {useStyles} from "../style/material_ui_style"
import {NotificationManager} from 'react-notifications'

import {useAsync} from '../../service/utils'
import {createWallet} from '../../api/safemoon/wallet'
import {useSetting} from '../../provider/setting'
import {getCookie, setCookie} from '../../service/cookie'

const WalletInfo = (props) => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const [setting, dispatch] = useSetting()
  const classes = useStyles();
  const [modalActive, setModalActive] = React.useState(false)
  const [walletId, setWalletId] = useState('')

  const handleClickOpen = () => {
    setWalletId(setting.walletId)
    setModalActive(true)
  }
  const handleClose = () => {
    setModalActive(false)
  }
  const handleSave = () => {
    run(createWallet(walletId))
  }

  useEffect(() => {
    if (status === 'idle') {
      console.log('idle')
    } else if (status === 'pending') {
      console.log('pending')
    } else if (status === 'rejected') {
      NotificationManager.error(error, 'Error', 3000)
    } else if (status === 'resolved') {
      dispatch({type: 'SET', settingName: 'walletId', settingData: walletId})
      setCookie('walletId', walletId, 10)
      setModalActive(false)
    }
  }, [status])
  return (
    <>
      <span onClick={handleClickOpen}>Enter Wallet Info</span>
      <Dialog 
        disableBackdropClick
        disableEscapeKeyDown
        open={modalActive} 
        onClose={handleClose} 
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth='sm'
      >
        <DialogTitle id="form-dialog-title">Settings</DialogTitle>
        <DialogContent>
          <DialogContentText>
            enter receive wallet id (we can not hack or steal coins from you with this address)
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="walletid"
            label="Wallet Id"
            inputProps={{min: 0, style: { textAlign: 'center', fontSize: 20, paddingTop: 10, paddingBottom: 10 }}}
            type="text"
            fullWidth
            variant="outlined"
            autoComplete="off"
            value={walletId}
            onChange={(e) => setWalletId(e.target.value)}
            style={{marginTop: 20}}
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
    </>
  )
}

export default WalletInfo
