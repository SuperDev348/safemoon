import siteConfig from '../../config/site.config'

function createWallet(walletId) {
  try {
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
  } catch(error) {
    return Promise.reject(error)
  }
}

export {
  createWallet
}