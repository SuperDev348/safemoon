const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
//Define a schema
const Schema = mongoose.Schema;

const HogeMarketSchema = new Schema({
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  Timestamp: {
    type: Date,
    default: Date.now,
  },
});
HogeMarketSchema.plugin(autoIncrement.plugin, 'HogeMarket');
module.exports = mongoose.model('HogeMarket', HogeMarketSchema)