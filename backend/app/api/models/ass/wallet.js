const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
//Define a schema
const Schema = mongoose.Schema;

const AssWalletSchema = new Schema({
  walletId: {
    type: String,
    unique: true,
  },
  Timestamp: {
    type: Date,
    default: Date.now,
  },
});
AssWalletSchema.plugin(unique, { message: 'That {PATH} is already taken.' });
AssWalletSchema.plugin(autoIncrement.plugin, 'AssWallet');
module.exports = mongoose.model('AssWallet', AssWalletSchema)