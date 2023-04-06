const axios = require('axios');
const marketModel = require('../../models/ass/market');	

const slugs = [
  {label: 'Pancake Swap', name: 'pancakeswap', id: 1},
  {label: 'BitMart', name: 'bitmart-token', id: 3},
  {label: 'WhiteBit', name: 'whitebit', id: 0},
]
module.exports = {
  
  create: function() {
    axios.get('https://api.coingecko.com/api/v3/coins/australian-safe-shepherd?tickers=true'+ new URLSearchParams({
      }))
    .then(async (result) => {
      await marketModel.remove({});
      await  Promise.all(result.data.tickers.forEach( async (item) => {
        
      }));
      }).catch((err) => {
        console.log('price api error in the ass')
      });
  },
}