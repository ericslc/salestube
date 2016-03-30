var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var video = new Schema({
  Title: {type: String, Unique: true, required: true, index: true},
  Desc: {type: String, required: true},
  link: {type: String},
  //uploaded: {type: String, ref: "User"}
})

module.exports = mongoose.model('Videos', video)
