import React, {useState, useEffect, useMemo} from 'react'
import {Grid} from '@material-ui/core'

import {useAsync} from '../../service/utils'
import {useSetting} from '../../provider/setting'
import {fetchPrice} from '../../api/hoge/price'

const formatYmd = (string) => {
  if (string === null || string === undefined)
    return ''
  else {
    return (new Date(string)).toISOString().slice(0, 10)
  }
}
const difDate = (string) => {
  if (string === null || string === undefined)
    return '0 day'
  else {
    const dif = (new Date()).getTime() - (new Date(string)).getTime()
    if (dif > 365 * 24 * 60 * 60000) {
      return `${Math.floor(dif/(365 * 24 * 60 * 60000))} year`
    }
    else if (dif > 30 * 24 * 60 * 60000) {
      return `${Math.floor(dif/(30 * 24 * 60 * 60000))} month`
    }
    else if (dif > 24 * 60 * 60000) {
      return `${Math.floor(dif/(24 * 60 * 60000))} day`
    }
    else if (dif > 60 * 60000) {
      return `${Math.floor(dif/(60 * 60000))} hour`
    }
    else if (dif > 60000) {
      return `${Math.floor(dif/(60000))} minute`
    }
    else if (dif > 1000) {
      return `${Math.floor(dif/(1000))} second`
    }
  }
}

const Price = (props) => {
  const {data} = props

  return (
    <div className="row" style={{maxHeight: 160, resize: 'none'}}>
      {/* general info */}
      <div className="widget" id="general">
        <div id="general1">
          <div className="widgettitle">
            <a><b>
                Current price: ${data?.price?.toFixed(10)}
            </b></a>
          </div>
          <div className="widgetelement">
            24h high: ${data?.max?.toFixed(10)}
          </div>
          <div className="widgetelement">
            All time high: ${data?.ath?.toFixed(10)} ({data?.ath_percentage?.toFixed(1)}%) {`${formatYmd(data?.ath_date)}(${difDate(data?.ath_date)})`}
          </div>
        </div>
        <div id="general2">
          <div className="widgettitle">
            <a><b>
              Total volume: ${data?.volume}
            </b></a>
            <div className="dropdown">
              <img src="images/dropdown.svg" />
            </div>
          </div>
          <div className="widgetelement">
            24 hour low: ${data?.min?.toFixed(10)}
          </div>
          <div className="widgetelement">
            All time low: ${data?.atl?.toFixed(10)} ({data?.atl_percentage?.toFixed(1)}%) {`${formatYmd(data?.atl_date)}(${difDate(data?.atl_date)})`}
          </div>
        </div>
      </div>
    </div>
  )
}

const  PriceInfo = () => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const [setting, dispatch] = useSetting()
  const [price, setPrice] = useState({})

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
      setPrice(data)
      dispatch({type: 'SET', settingName: 'price', settingData: data?.price})
    }
  }, [status])
  
  if (status === 'idle') {
    return (
      <Price data={price} />
    )
  } else if (status === 'pending') {
    if (price === 0)
      return (
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <div>... Loading</div>
        </Grid>
      ) 
    else 
      return (
        <Price data={price} />
    )
  } else if (status === 'rejected') {
    console.log(error)
  } else if (status === 'resolved') {
    return (
      <Price data={price} />
    )
  }

  throw new Error('This should be impossible')
}

export default PriceInfo