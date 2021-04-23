// safemoon
const coinController = require('../api/controllers/safemoon/coin');
const walletController = require('../api/controllers/safemoon/wallet');
const priceController = require('../api/controllers/safemoon/price');
const marketController = require('../api/controllers/safemoon/market');
// hoge
const hogeCoinController = require('../api/controllers/hoge/coin');
const hogeWalletController = require('../api/controllers/hoge/wallet');
const hogePriceController = require('../api/controllers/hoge/price');
const hogeMarketController = require('../api/controllers/hoge/market');

const safemoon = () => {
  // store price every 30s
  setInterval(function () {
    priceController.create()
  }, 30000)
  // store market price every 30s
  setInterval(function () {
    marketController.create()
  }, 30000)
  // const wallets = walletController.getAll()
  setInterval(function () {
    walletController.getAll().then(async(wallets) => {
      for (let wallet of wallets) {
        await coinController.create(wallet.walletId)
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    })
  }, 15 * 60000)
}
const hoge = () => {
  // store price every 30s
  setInterval(function () {
    hogePriceController.create()
  }, 30000)
  // store market price every 30s
  setInterval(function () {
    hogeMarketController.create()
  }, 30000)
  // const wallets = walletController.getAll()
  setInterval(function () {
    hogeWalletController.getAll().then(async(wallets) => {
      for (let wallet of wallets) {
        await hogeCoinController.create(wallet.walletId)
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    })
  }, 15 * 60000)
}

module.exports = {
  safemoon,
  hoge
};
