import siteConfig from '../../config/site.config'

const formatDate = date =>
  `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')} ${String(
    date.getSeconds(),
  ).padStart(2, '0')}.${String(date.getMilliseconds()).padStart(3, '0')}`

function getByWalletId(id) {
  try {
    return window
      .fetch(`${siteConfig.apiUrl}/api/hoge/coin/${id}`, {
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
      .fetch(`${siteConfig.apiUrl}/api/hoge/coin/day/${id}`, {
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
      .fetch(`${siteConfig.apiUrl}/api/hoge/coin/${id}`, {
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

function buy(walletId, amount) {
  console.log(`walletId: ${walletId}, amount: ${amount}`)
  try {
    return window
      .fetch(`${siteConfig.apiUrl}/api/hoge/coin/buy/`, {
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

function sell(walletId, amount) {
  try {
    return window
      .fetch(`${siteConfig.apiUrl}/api/hoge/coin/sell/`, {
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

function getHolderByWalletId(id) {
  try {
    return window
      .fetch(`${siteConfig.apiUrl}/api/hoge/coin/holder/${id}`, {
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

function getCommentByWalletId(id) {
  try {
    return window
      .fetch(`${siteConfig.apiUrl}/api/hoge/coin/comment/${id}`, {
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

export {
  getByWalletId,
  getDataPerDay,
  deleteByWalletId,
  sell,
  buy,
  getHolderByWalletId,
  getCommentByWalletId,
}