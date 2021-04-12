const axios = require('axios');
const priceModel = require('../models/price');	

module.exports = {
  getPrice: function(req, res, next) {
    const startTime = new Date();
    startTime.setHours(0);
    startTime.setMinutes(0);
    const current = new Date();
    priceModel.find({ 
      $and: [ { Timestamp: { $gte : startTime } }, { Timestamp: { $lte : current } }] 
    })
    .sort({Timestamp: -1})
    .exec()
    .then((result) => {
      if (result.length === 0)
        res.status(400).json({ msg: "Not found" });
      else {
        res.status(200).json({msg: "Found!", data: result[0]});
      }
    })
    .catch(error =>  {
      res.status(400).json({ msg: "Not found" });
    })
  },
  create: function() {
    const id = 8757
    axios.get('https://api.coingecko.com/api/v3/coins/safemoon?tickers=true'+ new URLSearchParams({
      }),
      )
    .then((result) => {
      // console.log(result.data.market_data)
      let price={};
      price.price = result.data.market_data.current_price.usd;
      price.max = result.data.market_data.high_24h.usd
      price.min = result.data.market_data.low_24h.usd
      price.volume = result.data.market_data.total_volume.usd
      console.log(price)
      priceModel.create(price, function (err, result) {
        if (err) {
          console.log(err)
        }
        else {
          console.log('success price' + price.price)
        }
      });
    }).catch((err) => {
      console.log('price api error')
    });
    
  },
}					