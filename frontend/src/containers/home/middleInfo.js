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
  const refreshEarning = () => {
    if (setting.walletId != null && setting.walletId != '') {
      run(getCoinByWalletId(setting.walletId))
    }
  }

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
      <div className="row">
        {/* chart */}
        <EarningsPerDay />
        {/* info */}
        <MarketInfo />
      </div>
      <div className="row">
        {/* earnings */}
        <div className="widget" id="earnings">
          <div className="widgettitle">
            <a><b>EARNINGS</b></a>
            <div className="titlesettings">
              30m
            </div>
            <div className="titlesettings">
              USD
            </div>
            <div className="titlesettings">
              <EditEarning refresh={refreshEarning} />
            </div>
          </div>
          <div className="widgetcontent">
            <div className="widgetelement">
              <div className="earningsstatus">
                <img src="images/down.svg" id="down" />
              </div>
              <div className="widgettext1">
                15 min
              </div>
              <div className="widgettext2">
                $ {displayNumber(earnings[0])}
              </div>
            </div>
            <div className="widgetelement">
              <div className="earningsstatus">
                <img src="images/up.svg" id="down" />
              </div>
              <div className="widgettext1">
                30 min
              </div>
              <div className="widgettext2">
                $ {displayNumber(earnings[1])}
              </div>
            </div>
            <div className="widgetelement">
              <div className="earningsstatus">
                <img src="images/down.svg" id="down" />
              </div>
              <div className="widgettext1">
                1 hour
              </div>
              <div className="widgettext2">
                $ {displayNumber(earnings[2])}
              </div>
            </div>
            <div className="widgetelement">
              <div className="earningsstatus">
                <img src="images/up.svg" id="down" />
              </div>
              <div className="widgettext1">
                12 hour
              </div>
              <div className="widgettext2">
                $ {displayNumber(earnings[3])}
              </div>
            </div>
            <div className="widgetelement">
              <div className="earningsstatus">
                <img src="images/up.svg" id="down" />
              </div>
              <div className="widgettext1">
                24 hour
              </div>
              <div className="widgettext2">
                $ {displayNumber(earnings[4])}
              </div>
            </div>
            <div className="widgetelement">
              <div className="earningsstatus">
                <img src="images/up.svg" id="down" />
              </div>
              <div className="widgettext1">
                1 week
              </div>
              <div className="widgettext2">
                $ {displayNumber(earnings[5])}
              </div>
            </div>
            <div className="widgetelement">
              <div className="earningsstatus">
                <img src="images/up.svg" id="down" />
              </div>
              <div className="widgettext1">
                1 month
              </div>
              <div className="widgettext2">
                $ {displayNumber(earnings[6])}
              </div>
            </div>
          </div>
        </div>
        {/* wallet (incomplete) */}
        <div className="widget" id="wallet">
          <div className="widgettitle">
            <a><b>WALLET</b></a>
            <div className="dropdown">
              <img src="images/dropdown.svg" />
            </div>
            <div className="titlesettings">
              <WalletInfo />
            </div>
          </div>
          <div className="widgetcontent">
            <div className="widgetelement">
              <div className="widgettext1">
                Total coins
              </div>
              <div className="widgettext2">
                {displayNumber(currentAmount)}
              </div>
            </div>
            <div className="widgetelement">
              <div className="widgettext1">
                Total values
              </div>
              <div className="widgettext2">
                $ {displayNumber(currentValue)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        {/* twitter */}
        <div className="widget" id="twitter">
          <div className="widgettitle">
            <a><b>TWITTER</b></a>
            <div className="dropdown">
              <img src="images/dropdown.svg" />
            </div>
          </div>
          <div className="widgetcontent">
            <div className="widgetcontent2">
                {/* twitter feed here */}
            </div>
          </div>
        </div>
    </div>
      {/* <Grid item lg={6} xs={12}>
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
          <EditEarning refresh={refreshEarning} />
        </div>
      </Grid> */}
    </>
  )
}

export default MiddleInfo