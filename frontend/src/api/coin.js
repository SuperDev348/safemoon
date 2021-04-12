import siteConfig from '../config/site.config'

const formatDate = date =>
  `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')} ${String(
    date.getSeconds(),
  ).padStart(2, '0')}.${String(date.getMilliseconds()).padStart(3, '0')}`

function getCoinByWalletId(id) {
  try {
    return window
      .fetch(`${siteConfig.apiUrl}/api/coin/${id}`, {
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
  } catch (error) {
    return Promise.reject(error)
  }
}

function getDataPerDay(id) {
  try {
    return window
      .fetch(`${siteConfig.apiUrl}/api/coin/day/${id}`, {
        method: 'GET',
        headers: {
        },
      })
      .then(async response => {
        const {data} = await response.json()
        if (response.ok) {
          if (data) {
            console.log(data)
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
  } catch (error) {
    return Promise.reject(error)
  }
}

function deleteByWalletId(id) {
  try {
    return window
      .fetch(`${siteConfig.apiUrl}/api/coin/${id}`, {
        method: 'DELETE',
        headers: {
        },
      })
      .then(async response => {
        const {data, msg} = await response.json()
        if (response.ok) {
          console.log(data)
          if (data) {
            return msg
          } else {
            return Promise.reject(msg)
          }
        } else {
          // handle the graphql errors
          const error = {
            message: data?.errors?.map(e => e.message).join('\n'),
          }
          return Promise.reject(error)
        }
      })
  } catch (error) {
    return Promise.reject(error)
  }
}

export {
  getCoinByWalletId,
  getDataPerDay,
  deleteByWalletId,
}