const formatDate = date =>
  `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')} ${String(
    date.getSeconds(),
  ).padStart(2, '0')}.${String(date.getMilliseconds()).padStart(3, '0')}`

function fetchBitcoine(walletId) {

  return window
    .fetch('https://api.bscscan.com/api?'+ new URLSearchParams({
        module: 'account',
        action: 'tokenbalance',
        tag: 'latest',
        apikey: 'RJZX45QW9B6D4HDSKXKZ481AC8UCBZPHX6',
        address: walletId,
        contractaddress: '0x8076c74c5e3f5852037f31ff0093eeb8c8add8d3'
      }), 
    })
    .then(async response => {
      const {result, message} = await response.json()
      if (response.ok) {
        const res = {result}
        console.log(result)
        if (res && message !== 'NOTOK') {
          res.fetchedAt = formatDate(new Date())
          return res
        } else {
          return Promise.reject(new Error(`No data with the walletId "${walletId}"`))
        }
      } else {
        // handle the graphql errors
        const error = {
          // message: data?.errors?.map(e => e.message).join('\n'),
        }
        return Promise.reject(error)
      }
    })
}

export {
  fetchBitcoine
}