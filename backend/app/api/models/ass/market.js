const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
//Define a schema
const Schema = mongoose.Schema;

const AssMarketSchema = new Schema({
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
AssMarketSchema.plugin(autoIncrement.plugin, 'AssMarket');
module.exports = mongoose.model('AssMarket', AssMarketSchema)