import React, {useState, useEffect, useMemo} from 'react'
import {Grid} from '@material-ui/core'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts"

import {useStyles} from "../style/material_ui_style"
import {useAsync} from '../../service/utils'
import {getPriceHistory} from '../../api/dragon/price'

const PriceHistory = (props) => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const classes = useStyles();
  const [prices, setPrices] = useState([])

  useEffect(() => {
    run(getPriceHistory())
    const interval = setInterval(function () {
      run(getPriceHistory())
    }, 5 * 60000)
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
      console.log(error)
    } else if (status === 'resolved') {
      if (data.length != 0) {
        const tmp = data.map((item) => {
          const price = item.price
          const time = new Date(item.Timestamp)
          const stringTime = `${time.getMonth() + 1}/${time.getDate()} ${time.getHours()}:${time.getMinutes()}`
          return {time: stringTime, price: price}
        })
        setPrices(tmp)
      }
    }
  }, [status])
  return (
    <div className="row">
      <div className="widget">
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
                <LineChart
                  data={prices}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis dataKey="price" unit="$"/>
                  <Tooltip cursor={{fill: '#292E38'}} wrapperStyle={{ color: '#64a0aa' }} />
                  <Line dataKey="price" stroke="#64a0aa" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PriceHistory
