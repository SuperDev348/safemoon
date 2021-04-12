import React, {useState, useEffect, useMemo} from 'react'
import {Grid} from '@material-ui/core'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts"

import {useStyles} from "../style/material_ui_style"
import {useAsync} from '../../service/utils'
import {useSetting} from '../../provider/setting'
import {getCookie, setCookie} from '../../service/cookie'
import {getDataPerDay} from '../../api/coin'

const EarningsPerDay = (props) => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const [setting] = useSetting()
  const classes = useStyles();
  const [amounts, setAmounts] = useState([])

  useEffect(() => {
    if (setting.walletId != null && setting.walletId != '') {
      run(getDataPerDay(setting.walletId))
    }
    const interval = setInterval(function () {

      if (setting.walletId != null && setting.walletId != '') {
        run(getDataPerDay(setting.walletId))
      }
    }, 30000)
    return () => {
      clearInterval(interval);
    }
  }, [run, setting])
  useEffect(() => {
    if (status === 'idle') {
      console.log('idle')
    } else if (status === 'pending') {
      console.log('pending')
    } else if (status === 'rejected') {
      console.log(error)
    } else if (status === 'resolved') {
      if (data.length != 0) {
        const tmp = data.map((item) => {
          const amount = item.amount
          const time = `${( new Date(item.time)).getMonth() + 1}-${(new Date(item.time)).getDate()}`
          return {time: time, earning: amount}
        })
        setAmounts(tmp)
      }
    }
  }, [status])
  return (
    <Grid item lg={6} xs={12}>
      <div className={`${classes.panel} ${classes.middle}`}>
        <div className={classes.title} style={{paddingBottom: 50}}>
          Earnings per day
        </div>
        <div style={{height: '100%', width: '100%'}}>
          <ResponsiveContainer minHeight={100} width="100%" height="60%">
            <BarChart
              data={amounts}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="earning" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Grid>
  )
}

export default EarningsPerDay
