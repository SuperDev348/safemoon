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

import Nav from './layout/nav'
import {useAsync} from '../service/utils'
import {fetchPrice} from '../api/price'
import {fetchBitcoine} from '../api/bitcoin'
import {getCoinByWalletId, createCoin} from '../api/coin'
import {useSetting} from '../provider/setting'

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
    run(fetchPrice(8757))
  }, [run])
  React.useEffect(() => {
    if (status === 'resolved') {
      const initPrice = data?.quote?.USD?.price
      let tmp = initPrice
      if (tmp.toString().length > 6)
        tmp = tmp.toExponential(3)
      setPrice(tmp)
      dispatch({type: 'SET', settingName: 'price', settingData: initPrice * 100000000})
    }
  }, [status])
  
  if (status === 'idle') {
    return 'Submit a pokemon'
  } else if (status === 'pending') {
    return <span>... Loading</span>
  } else if (status === 'rejected') {
    throw error
  } else if (status === 'resolved') {
    
    return <span>Current price: ${price}</span>
  }

  throw new Error('This should be impossible')
}

function MiddleInfo(props) {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const {amount} = props
  const classes = useStyles();
  const [setting, dispatch] = useSetting()
  const [amounts, setAmounts] = useState([0, 0, 0, 0, 0, 0, 0])
  const [earnings, setEarnings] = useState([0, 0, 0, 0, 0, 0, 0])
  const [currentAmount, setCurrentAmount] = useState(0)
  const [currentValue, setCurrentValue] = useState(0)
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
  useEffect(() => {
    run(createCoin(setting.walletId, amount))
  }, [run, amount])
  useEffect(() => {
    if (setting?.walletId != null && setting.walletId != '') {
      console.log('init earning')
      run(getCoinByWalletId(setting.walletId))
    }
  }, [setting?.walletId, run])
  useEffect(() => {
    if (status === 'idle') {
      console.log('idle')
    } else if (status === 'pending') {
      console.log('pending')
    } else if (status === 'rejected') {
      throw error
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
              if (tmp.toString().length > 6) {
                tmpAmounts[index - 1] = tmp.toExponential(3)
                tmpEarnings[index - 1] = (tmp * setting?.price / 100000000 ).toExponential(3)
              }
            }
          }
        })
        // set Wallet values
        let tmpCurrentAmount = 0
        let tmpCurrentValue = 0
        if (data[0].toString().length > 6) {
          tmpCurrentAmount = data[0].toExponential(3)
          tmpCurrentValue = (data[0] * setting?.price / 100000000).toExponential(3)
        }
        else {
          tmpCurrentAmount = data[0]
          tmpCurrentValue = data[0] * setting?.price / 100000000
        }
        setCurrentAmount(tmpCurrentAmount)
        setCurrentValue(tmpCurrentValue)
        //--set Wallet values
      }
      setAmounts(tmpAmounts)
      setEarnings(tmpEarnings)
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
              <div className={classes.earningItem}>{amounts[0]}</div>
              <div className={classes.earningItem}>{amounts[1]}</div>
              <div className={classes.earningItem}>{amounts[2]}</div>
              <div className={classes.earningItem}>{amounts[3]}</div>
              <div className={classes.earningItem}>{amounts[4]}</div>
              <div className={classes.earningItem}>{amounts[5]}</div>
              <div className={classes.earningItem}>{amounts[6]}</div>
            </Grid>
            <Grid item>
              <div className={classes.earningItem}>$ {earnings[0]}</div>
              <div className={classes.earningItem}>$ {earnings[1]}</div>
              <div className={classes.earningItem}>$ {earnings[2]}</div>
              <div className={classes.earningItem}>$ {earnings[3]}</div>
              <div className={classes.earningItem}>$ {earnings[4]}</div>
              <div className={classes.earningItem}>$ {earnings[5]}</div>
              <div className={classes.earningItem}>$ {earnings[6]}</div>
            </Grid>
          </Grid>
        </div>
      </Grid>
      <Grid item lg={6} xs={12}>
        <div className={`${classes.panel} ${classes.middle}`}>
          <div className={classes.title}>
            Wallet
          </div>
          <div className={classes.walletItem} style={{paddingTop: 60}}>Total coins - {currentAmount}</div>
          <div className={classes.walletItem}>Total values - $ {currentValue}</div>
          <Grid 
            container
            direction="row"
            justify="center"
            alignItems="center"
            style={{paddingTop: 30}}
          >
            <Button className={classes.button} variant="outlined" onClick={handleClickOpen}>Enter Wallet Info</Button>
          </Grid>
        </div>
      </Grid>
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

function Home() {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const [setting] = useSetting()
  const [amount, setAmount] = useState(0)
  const classes = useStyles();

  useEffect(() => {
    const interval = setInterval(function () {
      console.log('update coin')
      console.log(setting)
      if (setting.walletId != null && setting.walletId != '') {
        run(fetchBitcoine(setting.walletId))
      }
    }, 15 * 60000)
    return () => {
      clearInterval(interval);
    }
  }, [run])
  useEffect(() => {
    if (status === 'idle') {
      console.log('idle')
    } else if (status === 'pending') {
      console.log('pending')
    } else if (status === 'rejected') {
      throw error
    } else if (status === 'resolved') {
      setAmount(data.result)
    }
  }, [status])

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
          <MiddleInfo amount={amount} />
        </Grid>
      </Container>
    </div>
  )
}
export default Home
