const axios = require('axios');
const coinModel = require('../models/coin');	

const NO_DATA = -1
const getDataWithTime = async (walletId, startTimeStamp, endTimeStamp) => { //minutes
  const currentDate = new Date()
  const startTime = new Date(currentDate.getTime() - startTimeStamp*60000)
  const endTime = new Date(currentDate.getTime() - endTimeStamp*60000)
  try {
    const result = await coinModel.find({$and: [
        { walletId: walletId },
        { $and: [ { Timestamp: { $gte : startTime } }, { Timestamp: { $lte : endTime } }] }
      ]})
    .sort({Timestamp: 1})
    .exec()
    // console.log(result)
    if (result.length == 0)
      return NO_DATA
    else {
      return result[0].amount
    }
  } catch (error) {
    console.log('error')
    return NO_DATA
  }
}

const getDataByWalletId = async (walletId) => {
  const timeStamps = 
  [
    {start: 15, end: 0},
    {start: 30, end: 15},
    {start: 60, end: 30},
    {start: 12*60, end: 60},
    {start: 24*60, end: 12*60},
    {start: 7*24*60, end: 24*60},
    {start: 52*7*24*60, end: 24*7*60},
  ]
  // current amount
  let currentAmount = NO_DATA
  try {
    const result = await coinModel.find({$and: [
      { walletId: walletId },
    ]})
    .sort({Timestamp: -1})
    .exec()
    if (result.length != 0)
      currentAmount = result[0].amount
  } catch (error) {
    console.log('current amount error')
  }
  // amounts
  let amounts = await  Promise.all(timeStamps.map( async (item) => {
    const amount = await getDataWithTime(walletId, item.start, item.end)
    return amount
  }))
  amounts = [currentAmount, ...amounts]
  return amounts
}

module.exports = {
  getById: function(req, res, next) {
    coinModel.findById(req.params.Id, function(err, result){
      if (err) {
        res.status(400).json({ msg: "Not found" });
      } else {
        res.status(200).json({msg: "Found!", data: result});
      }
    });
  },

  getByWalletId: function(req, res, next) {
    getDataByWalletId(req.params.Id)
    .then((result) => {
      console.log(result)
      res.status(200).json({msg: "Found!", data: result});
    })
  },

  getAll: function(req, res, next) {
    coinModel.find({}, function(err, result){
      if (err){
        res.status(500).json({ msg: "Internal Server error" });
      } else{				
        res.status(200).json({msg: "Result found!", data: result});							
      }

    });
  },

  updateById: function(req, res, next) {
    var coin={};
    coin.walletId=req.body.walletId;
    coin.amount=req.body.amount;
    coinModel.findByIdAndUpdate(req.params.Id, coin, function(err, result){
      if(err)
        res.status(400).json({ msg: "Update failed!" });
      else {
        res.status(200).json({ msg: "Updated successfully!", data:null});
      }
    });
  },

  deleteById: function(req, res, next) {
    coinModel.findByIdAndRemove(req.params.Id, function(err, movieInfo){
      if(err)
        res.status(400).json({ msg: "Delete failed!" });
      else {
        res.status(200).json({ msg: "Deleted successfully!"});
      }
    });
  },

  create: function(walletId) {
    var coin={};
    coin.walletId=walletId;
    axios.get('https://api.bscscan.com/api?'+ new URLSearchParams({
        module: 'account',
        action: 'tokenbalance',
        tag: 'latest',
        apikey: 'RJZX45QW9B6D4HDSKXKZ481AC8UCBZPHX6',
        address: coin.walletId,
        contractaddress: '0x8076c74c5e3f5852037f31ff0093eeb8c8add8d3'
      }),
      {headers: {
        'User-Agent': 'HTTPBot-iOS/2021.1',
      }},
      )
    .then((res) => {
      coin.amount=Math.floor(res.data.result/1000000000);
      console.log(coin)
      coinModel.create(coin, function (err, result) {
        if (err) {					
          if (err.errors) {	
            if (err.errors.walletId) {
              console.log('coin error: ' + err.errors.walletId.message)
              return;
              }
          }
          console.log('coin create fail')
        }
        else {
          console.log('success coin ' + walletId)
        }
      });
    }).catch((err) => {
      console.log('bitcoin api error')
    });
  },
}					