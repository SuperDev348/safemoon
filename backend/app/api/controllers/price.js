const axios = require('axios');
const priceModel = require('../models/price');	

module.exports = {
  getPrice: function(req, res, next) {
    priceModel.find()
    .sort({Timestamp: -1})
    .limit(1)
    .exec()
    .then((result) => {
      res.status(200).json({msg: "Found!", data: result[0]});
    })
    .catch(error =>  {
      res.status(400).json({ msg: "Not found" });
    })
  },
  createPrice: function() {
    const id = 8757
    axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?'+ new URLSearchParams({
        id: id,
      }),
      {headers: {
        'X-CMC_PRO_API_KEY': 'd2a7a936-e772-45b2-91f1-786577bd0240',
      }},
      )
    .then((result) => {
      let price={};
      price.price=result.data.data[id].quote.USD.price;
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