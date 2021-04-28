const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
//Define a schema
const Schema = mongoose.Schema;

const AssCoinSchema = new Schema({
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
AssCoinSchema.plugin(autoIncrement.plugin, 'AssCoin');
module.exports = mongoose.model('AssCoin', AssCoinSchema)