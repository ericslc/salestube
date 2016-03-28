var localStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

var User = require('../server/user');
var configAuth = require('./auth');
module.exports= function(passport) {

  passport.serializeUser(function(user, done){
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done){
    User.findById(id, function(id, done){
      done(err, user);
    });
  });
  passport.use('local-signup', new localStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  },
  function(req, email, password, done) {
    process.nextTick(function(){
      User.findOnce({ 'local.email': email}, function(err, user){
        if(err){
          return done(err);
        }
        if(user){
          return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
        }else{
          var newUser = new User();
          newUser.local.email = email;
          newUser.local.password = newUser.generateHash(password);
          newUser.save(function(err){
            if(err)
            throw err;
            return done(null, newUser);
          });
        }
      });
    });
  }
}));
}
