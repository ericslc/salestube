var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var videoSchema = new Schema({
  Title: {type: String, Unique: true, required: true, index: true},
  Desc: {type: String, required: true},
  link: {type: String},
  //uploaded: {type: String, ref: "Members"}
})

module.exports = mongoose.model('Videos', videoSchema)
