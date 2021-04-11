const axios = require('axios');
const marketModel = require('../models/market');	

const slugs = [
  {label: 'Pancake Swap', name: 'pancakeswap', id: 7186},
  {label: 'BitMart Token', name: 'bitmart-token', id: 2933},
  {label: 'BitWhite', name: 'bitwhite', id: 2489},
]
module.exports = {
  getMarket: async function(req, res, next) {
    data = []
    try {
      for (let slug of slugs) {
        let result = await marketModel.find({ name: slug.name })
          .sort({Timestamp: -1})
          .limit(1)
          .exec()
        const tmp = {name: slug.name, label: slug.label, price: result[0]}
        data = [...data, tmp]
      }
      res.status(200).json({msg: "Found!", data: data});
    } catch(error) {
      res.status(400).json({ msg: "Not found" });
    }
  },
  create: function() {
    for (let slug of slugs) {
      axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?'+ new URLSearchParams({
        id: slug.id,
        }),
        {headers: {
          'X-CMC_PRO_API_KEY': 'd2a7a936-e772-45b2-91f1-786577bd0240',
        }},
      )
      .then((result) => {
        let market = {};
        market.price = result.data.data[slug.id].quote.USD.price;
        market.name = slug.name
        marketModel.create(market, function (err, result) {
          if (err) {
            console.log(err)
          }
          else {
            console.log(`success price of ${slug.name} : ${market.price}`)
          }
        });
      }).catch((err) => {
        console.log('price api error')
      });
    }
    
    
  },
}					