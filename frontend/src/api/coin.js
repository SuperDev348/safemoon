import siteConfig from '../config/site.config'

const formatDate = date =>
  `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')} ${String(
    date.getSeconds(),
  ).padStart(2, '0')}.${String(date.getMilliseconds()).padStart(3, '0')}`

function getCoinByWalletId(id) {
  return window
    .fetch(`${siteConfig.apiUrl}/api/coin/${(new URLSearchParams({
        id: id,
      }))}`, {
      method: 'GET',
      headers: {
      },
    })
    .then(async response => {
      const {data} = await response.json()
      if (response.ok) {
        if (data) {
          return data
        } else {
          return Promise.reject(new Error(`No data with the id "${id}"`))
        }
      } else {
        // handle the graphql errors
        const error = {
          message: data?.errors?.map(e => e.message).join('\n'),
        }
        return Promise.reject(error)
      }
    })
}

function createCoin(walletId, amount) {
  return window
    .fetch(`${siteConfig.apiUrl}/api/coin/`, 
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        walletId: walletId,
        amount: amount
      }),
    })
    .then(async response => {
      const {data} = await response.json()
      if (response.ok) {
        if (data) {
          return data
        } else {
          return Promise.reject(new Error(`No data`))
        }
      } else {
        // handle the graphql errors
        const error = {
          message: data?.errors?.map(e => e.message).join('\n'),
        }
        return Promise.reject(error)
      }
    })
}

export {
  getCoinByWalletId,
  createCoin
}