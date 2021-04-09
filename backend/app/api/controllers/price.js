const axios = require('axios');

module.exports = {
  getPrice: function(req, res, next) {
    const id = req.params.Id
    axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?'+ new URLSearchParams({
        id: id,
      }), 
      {headers: {
        'X-CMC_PRO_API_KEY': 'd2a7a936-e772-45b2-91f1-786577bd0240',
      }},
      )
    .then((result) => {
      res.status(200).json({msg: "find!", data: result?.data?.data});
    }).catch((err) => {
      res.status(400).json({ msg: "Not find" });
    });
  },
}					