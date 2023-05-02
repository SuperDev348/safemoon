const axios = require('axios');
const walletModel = require('../../models/hoge/wallet');	

module.exports = {
 
  create: async function(req, res, next) {
    let wallet={};
    wallet.walletId=req.body.walletId;
    console.log(req.body)
    // check unique walletId
    const wallets = await walletModel.find().exec()
    for (let item of wallets) {
      if (item.walletId === wallet.walletId) {
        res.status(200).json({msg: "Aleady exist", data: item._id});
        return
      }
    }
    // check invalid walletId
    axios.get('https://api.etherscan.io/api?'+ new URLSearchParams({
        module: 'account',
        action: 'tokenbalance',
        tag: 'latest',
        apikey: 'T4TZAAF5U4CXJDU2YGQZMW8GYY6KG1Z1DS',
        address: wallet.walletId,
        contractaddress: '0xfad45e47083e4607302aa43c65fb3106f1cd7607'
      }),
      {headers: {
        'User-Agent': 'HTTPBot-iOS/2021.1',
      }},
      )
    .then((data) => {
      if (data) {
        const {message} = data.data
        if (message !== 'NOTOK') {
          walletModel.create(wallet, function (err, result) {
            if (err) {
              res.status(400).json({ msg: "Creat failed", data: null});
            }
            else {
              res.status(200).json({msg: "Created successfully!", data: result._id});
            }
          });
        } else {
          res.status(400).json({ msg: "Invalid WalletId", data: null});
        }
      } else {
        // handle the graphql errors
        res.status(400).json({ msg: "Creat failed", data: null});
      }
    }).catch((err) => {
      console.log('bitcoin api error')
    });
  },
}					