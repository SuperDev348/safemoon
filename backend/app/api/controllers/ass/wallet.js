const axios = require('axios');
const walletModel = require('../../models/ass/wallet');	

module.exports = {
  getAll: async function () {
    try {
      const result = await walletModel.find().exec()
      return result
    } catch {
      console.log('wallet controller get error')
    }
  },
  create: async function(req, res, next) {
    let wallet={};
    wallet.walletId=req.body.walletId;
    console.log(req.body)
    // check unique walletId
    const wallets = await walletModel.find().exec()
    // check invalid walletId
    axios.get('https://api.bscscan.com/api?'+ new URLSearchParams({
        module: 'account',
        action: 'tokenbalance',
        tag: 'latest',
        apikey: 'RJZX45QW9B6D4HDSKXKZ481AC8UCBZPHX6',
        address: wallet.walletId,
        contractaddress: '0x7c63f96feafacd84e75a594c00fac3693386fbf0'
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