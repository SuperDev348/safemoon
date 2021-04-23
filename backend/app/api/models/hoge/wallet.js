const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
//Define a schema
const Schema = mongoose.Schema;

const HogeWalletSchema = new Schema({
  walletId: {
    type: String,
    unique: true,
  },
  Timestamp: {
    type: Date,
    default: Date.now,
  },
});
HogeWalletSchema.plugin(unique, { message: 'That {PATH} is already taken.' });
HogeWalletSchema.plugin(autoIncrement.plugin, 'HogeWallet');
module.exports = mongoose.model('HogeWallet', HogeWalletSchema)