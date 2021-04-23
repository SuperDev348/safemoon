const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
//Define a schema
const Schema = mongoose.Schema;

const CoinSchema = new Schema({
  walletId: {
    type: String,
  },
  amount: {
    type: Number,
  },
  Timestamp: {
    type: Date,
    default: Date.now,
  },
});
CoinSchema.plugin(autoIncrement.plugin, 'Coin');
module.exports = mongoose.model('Coin', CoinSchema)