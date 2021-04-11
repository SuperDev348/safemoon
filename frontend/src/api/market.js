import siteConfig from '../config/site.config'

const formatDate = date =>
  `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')} ${String(
    date.getSeconds(),
  ).padStart(2, '0')}.${String(date.getMilliseconds()).padStart(3, '0')}`

function fetchMarket() {

  return window
    .fetch(`${siteConfig.apiUrl}/api/market`, {
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
  fetchMarket
}