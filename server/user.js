var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var passportLocalMongoose = require('passport-local-mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  local              : {
        email        : String,
        password     : String
},
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }
});
userSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
}
module.exports = mongoose.model('User', userSchema);
