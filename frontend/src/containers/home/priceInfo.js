import React, {useState, useEffect, useMemo} from 'react'
import {Grid} from '@material-ui/core'

import {useAsync} from '../../service/utils'
import {useSetting} from '../../provider/setting'
import {fetchPrice} from '../../api/price'

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
    <Grid
      container
      direction="row"
    >
      <Grid item lg={6} xs={12}>
        <div style={{textAlign: 'center'}}>Current price: ${data?.price?.toFixed(10)}</div>
      </Grid>
      <Grid item lg={6} xs={12}>
        <div style={{textAlign: 'center'}}>total volume: ${data?.volume}</div>
      </Grid>
      <Grid item lg={6} xs={12}>
        <div style={{textAlign: 'center'}}>24 hour high: ${data?.max?.toFixed(10)}</div>
      </Grid>
      <Grid item lg={6} xs={12}>
        <div style={{textAlign: 'center'}}>24 hour low: ${data?.min?.toFixed(10)}</div>
      </Grid>
      <Grid item lg={6} xs={12}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item>
            All time high:
          </Grid>
          <Grid item style={{paddingLeft: 5}}>
            <div>
              <span>${data?.ath?.toFixed(10)}</span>
              <span style={{color: 'red'}}>{data?.ath_percentage?.toFixed(1)}%</span>
            </div>
            <div style={{color: '#3f51b5', fontSize: 18}}>
              {`${formatYmd(data?.ath_date)}(${difDate(data?.ath_date)})`}
            </div>
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={6} xs={12}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item>
            All time low:
          </Grid>
          <Grid item style={{paddingLeft: 5}}>
            <div>
              <span>${data?.atl?.toFixed(10)}</span>
              <span style={{color: 'red'}}>{data?.atl_percentage?.toFixed(1)}%</span>
            </div>
            <div style={{color: '#3f51b5', fontSize: 18}}>
              {`${formatYmd(data?.atl_date)}(${difDate(data?.atl_date)})`}
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
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