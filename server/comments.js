var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Videos = require('./videos');

var Comment = new Schema({
  comment: {type:String, index: {sparse: true}},
  link: {type: String, required: false}

});




module.exports = mongoose.model('Comment', Comment);
