const axios = require('axios');
const marketModel = require('../models/market');	

const slugs = [
  {label: 'Pancake Swap', name: 'pancakeswap', id: 1},
  {label: 'BitMart Token', name: 'bitmart-token', id: 3},
  {label: 'WhiteBit', name: 'whitebit', id: 0},
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
    axios.get('https://api.coingecko.com/api/v3/coins/safemoon?tickers=true'+ new URLSearchParams({
      }))
    .then((result) => {
      slugs.forEach((slug) => {
        let market = {};
        market.price = result.data.tickers[slug.id].converted_last.usd;
        market.name = slug.name
        marketModel.create(market, function (err, result) {
          if (err) {
            console.log(err)
          }
          else {
            console.log(`success price of ${slug.name} : ${market.price}`)
          }
        });
      })
      }).catch((err) => {
        console.log('price api error')
      });
  },
}					