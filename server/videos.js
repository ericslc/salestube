var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user');

var video = new Schema({
  Title: {type: String, Unique: true, required: true, index: true},
  Desc: {type: String, required: true},
  link: {type: String},
  topic: {type:String, required: true},
  favorite: [{type: Schema.Types.ObjectId, ref: 'user'}],
  comments: [String]
  })

module.exports = mongoose.model('Videos', video)
