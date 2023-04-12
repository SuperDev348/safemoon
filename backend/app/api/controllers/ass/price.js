const axios = require('axios');
const priceModel = require('../../models/ass/price');	

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
}					