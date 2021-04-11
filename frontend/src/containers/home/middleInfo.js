import React, {useState, useEffect, useMemo} from 'react'
import {Grid, Button} from '@material-ui/core'
import {makeStyles} from "@material-ui/core/styles"
import { Edit } from '@material-ui/icons'

import {useAsync} from '../../service/utils'
import {displayNumber} from '../../service/textService'
import {useSetting} from '../../provider/setting'
import {getCookie, setCookie} from '../../service/cookie'
import {getCoinByWalletId} from '../../api/coin'
import {useStyles} from '../style/material_ui_style'
import WalletInfo from './walletInfo'
import MarketInfo from './marketInfo'
import EditEarning from './editEarning'
import EarningsPerDay from './earningsPerDay'

const MiddleInfo = () => {
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
          <EditEarning />
        </div>
      </Grid>
      <Grid item lg={6} xs={12}>
        <div className={`${classes.panel} ${classes.middle}`}>
          <div className={classes.title}>
            Wallet
          </div>
          <div className={classes.walletItem}>Total coins - {displayNumber(currentAmount)}</div>
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
      <EarningsPerDay />
      <MarketInfo />
    </>
  )
}

export default MiddleInfo