import React, {useState, useEffect, useMemo} from 'react'
import {
  Grid,
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
import {deleteByWalletId, buy, sell} from '../../api/charizoid/coin'
import {useSetting} from '../../provider/setting'
import {getCookie, setCookie} from '../../service/cookie'
import {isNumeric} from '../../service/textService'

const EditEarning = (props) => {
  const {refresh} = props
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const [setting, dispatch] = useSetting()
  const classes = useStyles();
  const [modalActive, setModalActive] = React.useState(false)
  const [amount, setAmount] = useState('')

  const validate = () => {
    if (amount === '') {
      NotificationManager.warning('Please insert amount', 'Warning', 3000)
      return false
    }
    if (!isNumeric(amount)) {
      NotificationManager.warning('Please insert numeric', 'Warning', 3000)
      return false
    }
    return true
  }
  const handleClickOpen = () => {
    setAmount('')
    setModalActive(true)
  }
  const handleClose = () => {
    setModalActive(false)
  }
  const handleBuy = () => {
    if (!validate())
      return
    run(buy(setting.walletId, amount))
  }
  const handleSell = () => {
    if (!validate())
      return
    run(sell(setting.walletId, amount))
  }
  const handleReset = () => {
    run(deleteByWalletId(setting.walletId))
  }

  useEffect(() => {
    if (status === 'idle') {
      console.log('idle')
    } else if (status === 'pending') {
      console.log('pending')
    } else if (status === 'rejected') {
      NotificationManager.error(error, 'Error', 3000)
    } else if (status === 'resolved') {
      NotificationManager.success(data, 'Success', 3000)
      refresh()
    }
  }, [status])
  return (
    <>
      <span onClick={handleClickOpen}>Edit Earning</span>
      <Dialog 
        disableBackdropClick
        disableEscapeKeyDown
        open={modalActive} 
        onClose={handleClose} 
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth='sm'
      >
        <DialogTitle id="form-dialog-title">Edit Earnings</DialogTitle>
        <DialogContent>
          <DialogContentText>
            please edit earnings
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="amount"
            label="Amount"
            inputProps={{min: 0, style: { textAlign: 'center', fontSize: 20, paddingTop: 10, paddingBottom: 10 }}}
            type="text"
            fullWidth
            variant="outlined"
            autoComplete="off"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{marginTop: 20}}
          />
          <Grid 
            container
            direction="row"
            justify="center"
            alignItems="center"
            style={{paddingTop: 30}}
          >
            <Button className={classes.button} style={{marginLeft: 10, marginRight: 10}} variant="outlined" onClick={handleBuy}>Buy</Button>
            <Button className={classes.button} style={{marginLeft: 10, marginRight: 10}} variant="outlined" onClick={handleSell}>Sell</Button>
            <Button className={classes.button} style={{marginLeft: 10, marginRight: 10}} variant="outlined" onClick={handleReset}>Reset</Button>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button className={classes.button} onClick={handleClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default EditEarning
