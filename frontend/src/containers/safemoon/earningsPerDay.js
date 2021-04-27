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
import {useSetting} from '../../provider/safemoon'
import {getCookie, setCookie} from '../../service/cookie'
import {getDataPerDay} from '../../api/safemoon/coin'

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
        if (setting.walletId != null && setting.walletId != '') {
          setAmounts(tmp)
        }
      }
    }
  }, [status])
  return (
    <div className="widget" id="chart">
      <div className="widgettitle">
        <a><b>CHART</b></a>
        <div className="titlesettings">
          {/*  value / profit */}
          value
        </div>
        <div className="titlesettings">
          30m
          {/* dropdown appears when clicked */}
        </div>
        <div className="titlesettings">
          USD
        </div>
      </div>
      <div className="widgetcontent">
        <div className="widgetcontent2">
          {/* chart here */}
          <div style={{height: '100%', width: '100%'}}>
            <ResponsiveContainer minHeight={100} width="100%" height="100%">
              <BarChart
                data={amounts}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip cursor={{fill: '#292E38'}} wrapperStyle={{ color: '#64a0aa' }} />
                <Bar dataKey="earning" fill="#64a0aa" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EarningsPerDay
