const axios = require('axios');
const priceModel = require('../../models/safemoon/price');	

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
    .catch(error =>  {
      res.status(400).json({ msg: "Not found" });
    })
  },
  getPrices: function(req, res, next) {
    const startTime = new Date();
    startTime.setDate(startTime.getDate() - 7 + 1)
    startTime.setHours(0);
    startTime.setMinutes(0);
    const current = new Date();
    priceModel.find({ 
      $and: [ { Timestamp: { $gte : startTime } }, { Timestamp: { $lte : current } }] 
    })
    .sort({Timestamp: 1})
    .exec()
    .then((result) => {
      if (result.length === 0)
        res.status(400).json({ msg: "Not found" });
      else {
        result = result.filter((item, index) => index%120 === 0)
        res.status(200).json({msg: "Found!", data: result});
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
      price.ath = result.data.market_data.ath.usd
      price.ath_percentage = result.data.market_data.ath_change_percentage.usd
      price.ath_date = result.data.market_data.ath_date.usd
      price.atl = result.data.market_data.atl.usd
      price.atl_percentage = result.data.market_data.atl_change_percentage.usd
      price.atl_date = result.data.market_data.atl_date.usd
      priceModel.create(price, function (err, res) {
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
