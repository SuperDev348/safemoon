const axios = require('axios');
const marketModel = require('../../models/ass/market');	

const slugs = [
  {label: 'Pancake Swap', name: 'pancakeswap', id: 1},
  {label: 'BitMart', name: 'bitmart-token', id: 3},
  {label: 'WhiteBit', name: 'whitebit', id: 0},
]
module.exports = {
  getMarket: async function(req, res, next) {
    marketModel.find({}, function(err, result){
      if (err){
        res.status(400).json({ msg: "Not found" });
      } else{				
        res.status(200).json({msg: "Result found!", data: result});							
      }
    });
  },
}