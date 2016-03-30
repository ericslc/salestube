var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var passportLocalMongoose = require('passport-local-mongoose');
var userplaylist = require('./userplaylist');
var SALT_WORK_FACTOR = 10;

var User = new Schema({
  username: {
        type: String,
        unique: true,
        index: {sparse: true},
        required: true
    },
  password: {
        type: String,
        required: true,
        index: {sparse: true}
    },
playlist: [userplaylist]
});

User.plugin(passportLocalMongoose);

User.pre('save', function(next) {
   var user = this;
   if (!user.isModified('password')) return next();
   bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
       if (err) return next(err);
       bcrypt.hash(user.password, salt, null, function(err, hash) {
           if (err) return next(err);
           user.password = hash;
           next();
       });
   });
});

User.methods.comparePassword = function(candidatePassword, cb) {
   bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
       if (err) return cb(err);
       cb(null, isMatch);
   });
};

module.exports = mongoose.model('user', User);
