const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
//Define a schema
const Schema = mongoose.Schema;

const WalletSchema = new Schema({
  walletId: {
    type: String,
    unique: true,
  },
  Timestamp: {
    type: Date,
    default: Date.now,
  },
});
WalletSchema.plugin(unique, { message: 'That {PATH} is already taken.' });
WalletSchema.plugin(autoIncrement.plugin, 'Wallet');
module.exports = mongoose.model('Wallet', WalletSchema)