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
  Timestamp: {
    type: Date,
    default: Date.now,
  },
});
PriceSchema.plugin(autoIncrement.plugin, 'Price');
module.exports = mongoose.model('Price', PriceSchema)