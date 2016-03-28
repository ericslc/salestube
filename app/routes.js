module.exports = function(app, passport) {
  app.get('/login', function(req, res){
    res.render('login.html', {message: req.flash('loginMessage') });
  });


  app.get('signup.html', function(req, res){
    res.render('signup.html', {message: req.flash('signupMessage')});
  });
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/members',
    failureRedirect : '/signup',
    failureFlash : true
  }));

  app.get('/members', isLoggedIn, function(req, res){
    res.render('members.html', {
      user : req.user
    });
  });

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/login');
})
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }else{
    res.redirect('/login');
  };
};

};
