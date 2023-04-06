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
// ass
const assCoinController = require('../api/controllers/ass/coin');
const assWalletController = require('../api/controllers/ass/wallet');
const assPriceController = require('../api/controllers/ass/price');
const assMarketController = require('../api/controllers/ass/market');

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
const ass = () => {
  // store price every 30s
  setInterval(function () {
    assPriceController.create()
  }, 30000)
  // store market price every 30s
  setInterval(function () {
    assMarketController.create()
  }, 30000)
  // const wallets = walletController.getAll()
  setInterval(function () {
    assWalletController.getAll().then(async(wallets) => {
      for (let wallet of wallets) {
        await assCoinController.create(wallet.walletId)
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    })
  }, 15 * 60000)
}

module.exports = {
  safemoon,
  hoge,
  ass,
};
