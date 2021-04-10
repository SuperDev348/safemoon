import React, {useState, useEffect, useMemo} from 'react'
import {
  Container,
  Grid, 
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions
} from '@material-ui/core'
import {makeStyles} from "@material-ui/core/styles"
import {NotificationManager} from 'react-notifications'

import Nav from './layout/nav'
import {useAsync} from '../service/utils'
import {fetchPrice} from '../api/price'
import {fetchBitcoine} from '../api/bitcoin'
import {getCoinByWalletId, createCoin} from '../api/coin'
import {createWallet} from '../api/wallet'
import {useSetting} from '../provider/setting'
import {getCookie, setCookie} from '../service/cookie'
import {displayNumber} from '../service/textService'

const useStyles = makeStyles((theme) => ({
  button: {
    textTransform: 'none',
    outline: 'none !important',
  },
  panel: {
    border: 'solid 1px #e6cbcb',
    borderRadius: 5,
    padding: 20
  },
  title: {
    fontSize: 25,
    padding: 5
  },
  earningItem: {
    fontSize: 22,
    padding: 5
  },
  walletItem: {
    fontSize: 22,
    padding: 10,
    textAlign: 'center'
  },
  middle: {
    height: 400
  },
  price: {
    height: 150,
    fontSize: 35
  },
  twitter: {
    height: 300
  }
}))

function PriceInfo() {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const [setting, dispatch] = useSetting()
  const [price, setPrice] = useState(0)

  React.useEffect(() => {
    run(fetchPrice())
    const interval = setInterval(function () {
      run(fetchPrice())
    }, 30000)
    return () => {
      clearInterval(interval);
    }
  }, [run])
  React.useEffect(() => {
    if (status === 'resolved') {
      setPrice(data.price)
      dispatch({type: 'SET', settingName: 'price', settingData: data.price})
    }
  }, [status])
  
  if (status === 'idle') {
    return <span>Current price: ${price.toFixed(10)}</span>
  } else if (status === 'pending') {
    if (price === 0)
      return <span>... Loading</span>
    else 
      return <span>Current price: ${price.toFixed(10)}</span>
  } else if (status === 'rejected') {
    throw error
  } else if (status === 'resolved') {
    return <span>Current price: ${price.toFixed(10)}</span>
  }

  throw new Error('This should be impossible')
}

function WalletInfo(props) {
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
      <Button className={classes.button} variant="outlined" onClick={handleClickOpen}>Enter Wallet Info</Button>
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
            please enter wallet id and cron string in here
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

function MiddleInfo() {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const classes = useStyles();
  const [setting, dispatch] = useSetting()
  const [amounts, setAmounts] = useState([0, 0, 0, 0, 0, 0, 0])
  const [earnings, setEarnings] = useState([0, 0, 0, 0, 0, 0, 0])
  const [currentAmount, setCurrentAmount] = useState(0)
  const [currentValue, setCurrentValue] = useState(0)

  useEffect(() => {
    // first display from cookie
    const curAmount = getCookie('currentAmount')
    const curValue = getCookie('currentValue')
    if (curAmount != '')
      setCurrentAmount(parseInt(curAmount))
    if (curValue != '')
      setCurrentValue(parseFloat(curValue))
    const tmpAmounts = getCookie('amounts')
    const tmpEarnings = getCookie('earnings')
    if (tmpAmounts != '') {
      setAmounts(JSON.parse(tmpAmounts))
      console.log(JSON.parse(tmpAmounts))
    }
    if (tmpEarnings != '')
      setEarnings(JSON.parse(tmpEarnings))
  }, [])
  useEffect(() => {
    if (setting.walletId != null && setting.walletId != '') {
      run(getCoinByWalletId(setting.walletId))
    }
    const interval = setInterval(function () {
      console.log('update coin')
      console.log(setting)
      if (setting.walletId != null && setting.walletId != '') {
        run(getCoinByWalletId(setting.walletId))
      }
    }, 30000)
    return () => {
      clearInterval(interval);
    }
  }, [setting, run])
  useEffect(() => {
    if (status === 'idle') {
      console.log('idle')
    } else if (status === 'pending') {
      console.log('pending')
    } else if (status === 'rejected') {
      console.log(error)
    } else if (status === 'resolved') {
      let tmpAmounts = [0, 0, 0, 0, 0, 0, 0]
      let tmpEarnings = [0, 0, 0, 0, 0, 0, 0]
      if (data != null && data.length != 0 && data[0] != -1) {
        data.forEach((item, index) => {
          if (index != 0) {
            if (item == -1) {
              if (index == 1) {
                tmpAmounts[index - 1] = 0
                tmpEarnings[index - 1] = 0
              }
              else {
                tmpAmounts[index - 1] = tmpAmounts[index - 2]
                tmpEarnings[index - 1] = tmpEarnings[index - 2]
              }
            }
            else {
              let tmp = data[0] - item
              tmpAmounts[index - 1] = tmp
              tmpEarnings[index - 1] = tmp * setting?.price
            }
          }
        })
        // set Wallet values
        setCurrentAmount(data[0])
        setCurrentValue(data[0] * setting?.price)
        setCookie('currentAmount', data[0], 10)
        setCookie('currentValue', data[0] * setting?.price, 10)
        //--set Wallet values
        setCookie('amounts', JSON.stringify(tmpAmounts), 10)
        setCookie('earnings', JSON.stringify(tmpEarnings), 10)
        setAmounts(tmpAmounts)
        setEarnings(tmpEarnings)
      }
    }
  }, [status])

  return (
    <>
      <Grid item lg={6} xs={12}>
        <div className={`${classes.panel} ${classes.middle}`}>
          <div className={classes.title}>
            Earnings
          </div>
          <Grid
            container
            direction="row"
            justify="space-between"
          >
            <Grid item>
              <div className={classes.earningItem}>15min</div>
              <div className={classes.earningItem}>30min</div>
              <div className={classes.earningItem}>1h</div>
              <div className={classes.earningItem}>12h</div>
              <div className={classes.earningItem}>24h</div>
              <div className={classes.earningItem}>1week</div>
              <div className={classes.earningItem}>1month</div>
            </Grid>
            <Grid item>
              <div className={classes.earningItem}>{displayNumber(amounts[0])}</div>
              <div className={classes.earningItem}>{displayNumber(amounts[1])}</div>
              <div className={classes.earningItem}>{displayNumber(amounts[2])}</div>
              <div className={classes.earningItem}>{displayNumber(amounts[3])}</div>
              <div className={classes.earningItem}>{displayNumber(amounts[4])}</div>
              <div className={classes.earningItem}>{displayNumber(amounts[5])}</div>
              <div className={classes.earningItem}>{displayNumber(amounts[6])}</div>
            </Grid>
            <Grid item>
              <div className={classes.earningItem}>$ {displayNumber(earnings[0])}</div>
              <div className={classes.earningItem}>$ {displayNumber(earnings[1])}</div>
              <div className={classes.earningItem}>$ {displayNumber(earnings[2])}</div>
              <div className={classes.earningItem}>$ {displayNumber(earnings[3])}</div>
              <div className={classes.earningItem}>$ {displayNumber(earnings[4])}</div>
              <div className={classes.earningItem}>$ {displayNumber(earnings[5])}</div>
              <div className={classes.earningItem}>$ {displayNumber(earnings[6])}</div>
            </Grid>
          </Grid>
        </div>
      </Grid>
      <Grid item lg={6} xs={12}>
        <div className={`${classes.panel} ${classes.middle}`}>
          <div className={classes.title}>
            Wallet
          </div>
          <div className={classes.walletItem} style={{paddingTop: 60}}>Total coins - {displayNumber(currentAmount)}</div>
          <div className={classes.walletItem}>Total values - $ {displayNumber(currentValue)}</div>
          <Grid 
            container
            direction="row"
            justify="center"
            alignItems="center"
            style={{paddingTop: 30}}
          >
           <WalletInfo /> 
          </Grid>
        </div>
      </Grid>
    </>
  )
}

function Home() {
  const [setting] = useSetting()
  const classes = useStyles()

  return (
    <div>
      <Nav />
      <Container maxWidth="lg">
        <Grid container spacing={3} style={{paddingTop: 100}}>
          <Grid item xs={12}>
            <Grid 
              className={`${classes.panel} ${classes.price}`}
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <PriceInfo />
            </Grid>
          </Grid>
          <MiddleInfo />
        </Grid>
      </Container>
    </div>
  )
}
export default Home
