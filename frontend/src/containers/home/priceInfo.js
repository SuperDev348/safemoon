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
      dispatch({type: 'SET', settingName: 'price', settingData: data?.current?.price})
      dispatch({type: 'SET', settingName: 'maxPrice', settingData: data?.max?.price})
      dispatch({type: 'SET', settingName: 'minPrice', settingData: data?.min?.price})
    }
  }, [status])
  
  if (status === 'idle') {
    return <span>Current price: ${price.toFixed(10)}</span>
  } else if (status === 'pending') {
    if (price === 0)
      return <span>... Loading</span>
    else 
      return <span>Current price: ${price.toFixed(10)}</span>
  } else if (status === 'rejected') {
    throw error
  } else if (status === 'resolved') {
    return <span>Current price: ${price.toFixed(10)}</span>
  }

  throw new Error('This should be impossible')
}

export default PriceInfo
