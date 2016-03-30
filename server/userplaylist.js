var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = new Schema({
  Title: {type: String, unique: true, required: true},
  Desc: {type: String, unique: true, required: true},
  link: {type: String}
})
