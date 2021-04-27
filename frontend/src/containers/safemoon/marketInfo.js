import React, {useState, useEffect, useMemo} from 'react'
import {Grid} from '@material-ui/core'

import {useStyles} from "../style/material_ui_style"
import {useAsync} from '../../service/utils'
import {getCookie, setCookie} from '../../service/cookie'
import {fetchMarket} from '../../api/safemoon/market'

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
      data.sort((a, b) => {
        let comparison = 0;
        if (a.price > b.price) {
          comparison = -1;
        } else if (a.price < b.price) {
          comparison = 1;
        }
        return comparison;
      })
      setMarket(data)
      // console.log(data)
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
              <div className="widgetelement" key={index} style={{padding: '10px 0', lineHeight: '20px'}}>
                <span className="widgettext1">
                  {item?.name}
                </span>
                <span className="info-widgettext2 widgettext2">
                  ${item?.price?.toFixed(10)}
                </span>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default MarketInfo
