const axios = require('axios');
const marketModel = require('../../models/hoge/market');	

const slugs = [
  {label: 'Pancake Swap', name: 'pancakeswap', id: 1},
  {label: 'BitMart', name: 'bitmart-token', id: 3},
  {label: 'WhiteBit', name: 'whitebit', id: 0},
]
module.exports = {
  create: function() {
    axios.get('https://api.coingecko.com/api/v3/coins/hoge-finance?tickers=true'+ new URLSearchParams({
      }))
    .then(async (result) => {
      await marketModel.remove({});
      await  Promise.all(result.data.tickers.forEach( async (item) => {
        let market = {};
        market.name = `${item.market.name}(${item.target})`;
        market.price = item.converted_last.usd;
        try {
          await marketModel.create(market);
          console.log(`success market of ${market.name} : ${market.price}`);
        } catch (error) {
          console.log(err)
        }
      }));
      }).catch((err) => {
        console.log('price api error')
      });
  },
}
