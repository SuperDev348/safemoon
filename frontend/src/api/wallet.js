import siteConfig from '../config/site.config'

const formatDate = date =>
  `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')} ${String(
    date.getSeconds(),
  ).padStart(2, '0')}.${String(date.getMilliseconds()).padStart(3, '0')}`

function createWallet(walletId) {
  return window
    .fetch(`${siteConfig.apiUrl}/api/wallet/`, 
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        walletId: walletId
      }),
    })
    .then(async response => {
      const {data, msg, status} = await response.json()
      console.log(data)
      if (response.ok) {
        return data
      } else {
        return Promise.reject(msg)
      }
    })
}

export {
  createWallet
}