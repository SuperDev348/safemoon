const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
//Define a schema
const Schema = mongoose.Schema;

const PriceSchema = new Schema({
  price: {
    type: Number,
  },
  max: {
    type: Number,
  },
  min: {
    type: Number,
  },
  volume: {
    type: Number,
  },
  ath: {
    type: Number,
  },
  ath_percentage: {
    type: Number,
  },
  ath_date: {
    type: Date,
  },
  atl: {
    type: Number,
  },
  atl_percentage: {
    type: Number,
  },
  atl_date: {
    type: Date,
  },
  Timestamp: {
    type: Date,
    default: Date.now,
  },
});
PriceSchema.plugin(autoIncrement.plugin, 'Price');
module.exports = mongoose.model('Price', PriceSchema)