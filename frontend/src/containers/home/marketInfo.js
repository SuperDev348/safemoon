import React, {useState, useEffect, useMemo} from 'react'
import {Grid} from '@material-ui/core'

import {useStyles} from "../style/material_ui_style"
import {useAsync} from '../../service/utils'
import {getCookie, setCookie} from '../../service/cookie'
import {fetchMarket} from '../../api/market'

const MarketInfo = (props) => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const classes = useStyles();
  const [market, setMarket] = useState([])

  useEffect(() => {
    run(fetchMarket())
    const interval = setInterval(function () {
      run(fetchMarket())
    }, 30000)
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
      setMarket(data)
    }
  }, [status])
  return (
    <div className="widget" id="info">
      <div className="widgettitle">
        <a><b>INFO</b></a>
        <div className="dropdown">
          <img src="images/dropdown.svg" />
        </div>
      </div>
      <div className="widgetcontent">
        {
          market.map((item, index) => {
            return (
              <div className="widgetelement" key={index}>
                <div className="widgettext1">
                  {item?.label}
                </div>
                <div className="widgettext2">
                  ${item?.price?.price.toFixed(10)}
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default MarketInfo
