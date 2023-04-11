const axios = require('axios');
const coinModel = require('../../models/ass/coin');	

const NO_DATA = -1
const getDataWithTime = async (walletId, startTime, endTime) => {
  try {
    const result = await coinModel.find({$and: [
        { walletId: walletId },
        { $and: [ { Timestamp: { $gte : startTime } }, { Timestamp: { $lte : endTime } }] }
      ]})
    .sort({Timestamp: 1})
    .exec()
    return result
  } catch (error) {
    console.log('error')
    return []
  }
}

const getDataByWalletId = async (walletId) => {
  const timeStamps = 
  [
    {start: 15 + 5, end: 0},
    {start: 30 + 10, end: 15 + 5},
    {start: 60 + 10, end: 30 + 10},
    {start: 12*60, end: 60 + 10},
    {start: 24*60, end: 12*60},
    {start: 7*24*60, end: 24*60},
    {start: 52*7*24*60, end: 24*7*60},
  ]
  const currentDate = new Date()
  // current amount
  let currentAmount = NO_DATA
  
  currentAmount = Math.floor(res.data.result/1000000000);
  console.log(currentAmount)
  // amounts
  let amounts = await  Promise.all(timeStamps.map( async (item) => {
    let startTime = new Date(currentDate.getTime() - item.start*60000)
    let endTime = new Date(currentDate.getTime() - item.end*60000)
    const result = await getDataWithTime(walletId, startTime, endTime)
    if (result.length == 0)
      return NO_DATA
    else {
      return result[0].amount
    }
  }))
  amounts = [currentAmount, ...amounts]
  return amounts
}

const getDataPerDay = async (walletId) => {
  let end = new Date();
  end.setHours(0);
  end.setMinutes(0);
  let timeStamps = []
  for (let i=0; i<6; i++) {
    let item = {start: end.getTime() - (i + 1) * 24 * 60 * 60000, end: end.getTime() - i * 24 * 60 * 60000}
    timeStamps = [item, ...timeStamps]
  }
  timeStamps = [...timeStamps, {start: end, end: (new Date())}]
  let amounts = await  Promise.all(timeStamps.map( async (item) => {
    const result = await getDataWithTime(walletId, item.start, item.end)
    if (result.length == 0)
      return {amount: 0, time: item.start}
    else {
      let amount = result[result.length - 1].amount - result[0].amount
      return {amount: amount, time: item.start}
    }
  }))
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

  getPerDay: function(req, res, next) {
    getDataPerDay(req.params.Id)
    .then((result) => {
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

  deleteByWalletId: function(req, res, next) {
    const walletId = req.params.Id
    coinModel.remove({ walletId: walletId}, function(err, movieInfo){
      if(err)
        res.status(400).json({ msg: "Reset failed!", data: false});
      else {
        res.status(200).json({ msg: "Reset successfully!", data: true});
      }
    });
  },

  create: async function(walletId) {
    var coin={};
    coin.walletId=walletId;
    console.log('start axios')
    const res = await axios.get('https://api.bscscan.com/api?'+ new URLSearchParams({
        module: 'account',
        action: 'tokenbalance',
        tag: 'latest',
        apikey: 'RJZX45QW9B6D4HDSKXKZ481AC8UCBZPHX6',
        address: walletId,
        contractaddress: '0x7c63f96feafacd84e75a594c00fac3693386fbf0'
      }),
      {headers: {
        'User-Agent': 'HTTPBot-iOS/2021.1',
      }})
    console.log('axios end')
    if (res.data.result === undefined || res.data.result === null)
      console.log('coin data is NAN')
    else {
      coin.amount=Math.floor(res.data.result/1000000000);
      try {
        await coinModel.create(coin)
        console.log('success coin ' + walletId)
      } catch(error) {
        console.log(error)
      }
    }
  },

  buy: async function(req, res, next) {
    const walletId = req.body.walletId;
    const amount = req.body.amount;
    if (walletId === undefined|| walletId === null|| walletId === '')
      res.status(400).json({ msg: `Please set walletId`, data: false });
    if (amount === undefined|| amount === null|| amount === '')
      res.status(400).json({ msg: `Please set amount`, data: false });
    try {
      const coins = await coinModel.find({walletId: walletId});
      for (let coin of coins) {
        console.log(`old: ${coin.amount}, new: ${coin.amount + parseInt(amount)}`)
        await coinModel.update(
          { _id: coin._id },
          { $set : { amount: coin.amount + parseInt(amount) }}  
        )
      }
      res.status(200).json({ msg: `Buy ${amount} successfully!`, data: true});
    } catch(error) {
      res.status(400).json({ msg: `Buy ${amount} failed!`, data: false });
    }
  },

  sell: async function(req, res, next) {
    const walletId = req.body.walletId;
    const amount = req.body.amount;
    if (walletId === undefined|| walletId === null|| walletId === '')
      res.status(400).json({ msg: `Please set walletId`, data: false });
    if (amount === undefined|| amount === null|| amount === '')
      res.status(400).json({ msg: `Please set amount`, data: false });
    try {
      const coins = await coinModel.find({walletId: walletId});
      for (let coin of coins) {
        await coinModel.update(
          { _id: coin._id },
          { $set : { amount: coin.amount - parseInt(amount) }}
        )
      }
      res.status(200).json({ msg: `Sell ${amount} successfully!`, data: true});
    } catch(error) {
      res.status(400).json({ msg: `Sell ${amount} failed!`, data: false });
    }
  },
}					