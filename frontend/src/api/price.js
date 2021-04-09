const formatDate = date =>
  `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')} ${String(
    date.getSeconds(),
  ).padStart(2, '0')}.${String(date.getMilliseconds()).padStart(3, '0')}`

function fetchPrice(id) {

  return window
    .fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?'+ new URLSearchParams({
        id: id,
      }), {
      method: 'GET',
      headers: {
        'X-CMC_PRO_API_KEY': 'd2a7a936-e772-45b2-91f1-786577bd0240',
      },
    })
    .then(async response => {
      const {data} = await response.json()
      if (response.ok) {
        const res = data[id]
        if (res) {
          res.fetchedAt = formatDate(new Date())
          return res
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

export {
  fetchPrice
}