import siteConfig from '../../config/site.config'

const formatDate = date =>
  `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')} ${String(
    date.getSeconds(),
  ).padStart(2, '0')}.${String(date.getMilliseconds()).padStart(3, '0')}`

function fetchPrice() {
  try {
    return window
      .fetch(`${siteConfig.apiUrl}/api/price`, {
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
  } catch(error) {
    return Promise.reject(error)
  }
}

function getPriceHistory() {
  try {
    return window
      .fetch(`${siteConfig.apiUrl}/api/price/history`, {
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
  } catch(error) {
    return Promise.reject(error)
  }
}

export {
  fetchPrice,
  getPriceHistory,
}