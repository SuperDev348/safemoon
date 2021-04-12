import React, {useState, useEffect, useMemo} from 'react'

import {useAsync} from '../../service/utils'
import {useSetting} from '../../provider/setting'
import {fetchPrice} from '../../api/price'

const  PriceInfo = () => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const [setting, dispatch] = useSetting()
  const [price, setPrice] = useState(0)
  const [max, setMax] = useState(0)
  const [min, setMin] = useState(0)

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
      setPrice(data?.current?.price)
      setMax(data?.max?.price)
      setMin(data?.min?.price)
      dispatch({type: 'SET', settingName: 'price', settingData: data?.current?.price})
    }
  }, [status])
  
  if (status === 'idle') {
    return (
      <div>
        <div>Current price: ${price.toFixed(10)}</div>
        <div>Max price today: ${max.toFixed(10)}</div>
        <div>Min price today: ${min.toFixed(10)}</div>
      </div>
    )
  } else if (status === 'pending') {
    if (price === 0)
      return <div>... Loading</div>
    else 
      return (
      <div>
        <div>Current price: ${price.toFixed(10)}</div>
        <div>Max price today: ${max.toFixed(10)}</div>
        <div>Min price today: ${min.toFixed(10)}</div>
      </div>
    )
  } else if (status === 'rejected') {
    console.log(error)
  } else if (status === 'resolved') {
    return (
      <div>
        <div>Current price: ${price.toFixed(10)}</div>
        <div>Max price today: ${max.toFixed(10)}</div>
        <div>Min price today: ${min.toFixed(10)}</div>
      </div>
    )
  }

  throw new Error('This should be impossible')
}

export default PriceInfo