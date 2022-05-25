import siteConfig from '../../config/site.config'

const formatDate = date =>
  `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')} ${String(
    date.getSeconds(),
  ).padStart(2, '0')}.${String(date.getMilliseconds()).padStart(3, '0')}`

function fetchMarket() {
  try {
    return window
      .fetch(`${siteConfig.apiUrl}/api/hoge/market`, {
        method: 'GET',
        headers: {
        },
      })
      .then(async response => {
        const {data} = await response.json()
        
      })
  } catch(error) {
    return Promise.reject(error)
  }
}

export {
  fetchMarket
}