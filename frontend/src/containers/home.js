import React, {useState, useEffect, useMemo} from 'react'
import {Container, Grid} from '@material-ui/core'
import {makeStyles} from "@material-ui/core/styles"

import Nav from './layout/nav'
import {useAsync} from '../service/utils'
import {fetchPrice} from '../api/price'
import {fetchBitcoine} from '../api/bitcoin'
import {getCoinByWalletId, createCoin} from '../api/coin'
import {useSetting} from '../provider/setting'

const useStyles = makeStyles((theme) => ({
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
  let price = React.useMemo(() => 
    ''
    ,[])

  React.useEffect(() => {
    run(fetchPrice(8757))
  }, [run])
  React.useEffect(() => {
    dispatch({type: 'SET', settingName: 'price', settingData: price})
  }, [price])
  
  if (status === 'idle') {
    return 'Submit a pokemon'
  } else if (status === 'pending') {
    return <span>... Loading</span>
  } else if (status === 'rejected') {
    throw error
  } else if (status === 'resolved') {
    price = data?.quote?.USD?.price
    const tmp = price
    price = price * 100000000
    return <span>Current price: ${tmp.toExponential(3)}</span>
  }

  throw new Error('This should be impossible')
}

function EarningInfo(props) {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const {amount} = props
  const classes = useStyles();
  const [setting] = useSetting()
  const [amounts, setAmounts] = useState([0, 0, 0, 0, 0, 0, 0])
  
  useEffect(() => {
    run(createCoin(setting.walletId, amount))
  }, [run, amount])
  useEffect(() => {
    if (setting?.walletId != null && setting.walletId != '') {
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
      let tmp = [0, 0, 0, 0, 0, 0, 0]
      if (data != null && data.length != 0 && data[0] != -1) {
        data.forEach((item, index) => {
          if (index != 0) {
            if (item == -1) {
              if (index == 1)
                tmp[index - 1] = 0
              else
                tmp[index - 1] = tmp[index - 2]
            }
            else {
              tmp[index - 1] = data[0] - item
            }
          }
        })
      }
      setAmounts(tmp)
    }
  }, [status])

  return (
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
          <div className={classes.earningItem}>{amounts[0].toExponential(3)}</div>
          <div className={classes.earningItem}>{amounts[1].toExponential(3)}</div>
          <div className={classes.earningItem}>{amounts[2].toExponential(3)}</div>
          <div className={classes.earningItem}>{amounts[3].toExponential(3)}</div>
          <div className={classes.earningItem}>{amounts[4].toExponential(3)}</div>
          <div className={classes.earningItem}>{amounts[5].toExponential(3)}</div>
          <div className={classes.earningItem}>{amounts[6].toExponential(3)}</div>
        </Grid>
        <Grid item>
          <div className={classes.earningItem}>$ {(setting?.price * amounts[0]/100000000).toExponential(3)}</div>
          <div className={classes.earningItem}>$ {(setting?.price * amounts[1]/100000000).toExponential(3)}</div>
          <div className={classes.earningItem}>$ {(setting?.price * amounts[2]/100000000).toExponential(3)}</div>
          <div className={classes.earningItem}>$ {(setting?.price * amounts[3]/100000000).toExponential(3)}</div>
          <div className={classes.earningItem}>$ {(setting?.price * amounts[4]/100000000).toExponential(3)}</div>
          <div className={classes.earningItem}>$ {(setting?.price * amounts[5]/100000000).toExponential(3)}</div>
          <div className={classes.earningItem}>$ {(setting?.price * amounts[6]/100000000).toExponential(3)}</div>
        </Grid>
      </Grid>
    </div>
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
          <Grid item lg={4} md={6} xs={12}>
            <EarningInfo amount={amount} />
          </Grid>
          <Grid item lg={4} md={6} xs={12}>
            <div className={`${classes.panel} ${classes.middle}`}>

            </div>
          </Grid>
          <Grid item lg={4} md={6} xs={12}>
            <div className={`${classes.panel} ${classes.middle}`}>

            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}
export default Home
