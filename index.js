var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var morgan = require('morgan');
var config = require('./config/passport.js');
var app = express();
var Videos = require('./server/videos');
var User = require('./server/user');
var localStrategy = require('passport-local').Strategy;
var jwt = require('jwt-simple');
var port = 8034;





mongoose.set("debug", true);
mongoose.connect("mongodb://localhost/trainingvids");
mongoose.connection.once("open", function(){
  console.log("connected to mongodb");
});

app.use(express.static(__dirname));
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cookieParser());


app.use(session({secret: 'hopethisallworkswiththethings', resave: false,
saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

function isLoggedIn(req, res, next) {
 if (req.isAuthenticated()) {
   return next();
 }
}

//**videos**
app.get('/videos', function(req, res){
  var query;
  if(req.query.status){
    query = {status: req.query.status}
  }else{
    query = [];
  };
  Videos.find(query, function(err, videos){
    return res.send(videos);

  })
});
app.get('/user/status', function(req, res) {
 if (!req.isAuthenticated()) {
   return res.status(200).json({
     status: false
   });
 }
 res.status(200).json({
   status: true
 });
});
app.post('/videos', function(req, res) {
var video = new Videos(req.body);
video.save(function(err, s){
  if (err){
    return res.status(500).send(err);
  }else{
    res.send(s);
};
  });
});

app.put('/videos', function(req, res){
  Videos.findByIdAndUpdate(req.query.id, req.body, {new: true}, function(err, response){
    if(err){
      return res.status(500).send(err)
    }else{
       res.send();
      }
    })
});
app.delete('/videos', function(req, res){
  if(!req.query.id){
    return res.status(400).send('id query needed');
  }
  Videos.findByIdAndRemove(req.query.id, function(error, response){
    if(error){
      return res.status(500).json(error);
    }else{
      return res.json(response);
    }
  })
});


//**users**



app.get('/user', function(req, res){
  var query;
  if(req.query.status){
    query = {status: req.query.status}
  }else{
    query =  [];
  };
  User.find(query, function(err, user){
    return res.send(user);
  })
});
app.post('/user', function(req, res){
  var user = new User(req.body);
  user.save(function(err, s){
    return err ? res.status(500).send(err) : res.send(s);
  })
});
//
// app.post('/user', function(req, res){
//   User.findById(req.query.id, function(err, videos){
//     if(err){
//       res.status(500).send(err);
//     }else{
//       User.favorite.push(req.body);
//       User.save(function(err, data){
//         if (err) {
//            res.status(500).send(err)
//             } else {
//            res.send(data)
//         }
//       });
//     }
//   });
// });
app.post('/user', function(req, res){
  var user = new User(req.body);
  user.save(function(err, s){
    return err ? res.status(500).send(err) : res.send(s);
  })
});
app.put('/user', function(req, res){
  User.findByIdAndUpdate(req.query.id, req.body, function(err, user){
    if(err){
      return res.status(500).send(err);
    }else{
    return res.status(200).send(user);


    }
  })
});
app.delete('/user', function(req, res){
  if(!req.query.id){
    return res.status(400).send('enter in correct format ?id=');
  }
  User.findByIdAndRemove(req.query.id, function(error, response){
    if(error){
      return res.status(500).json(error);
    }else{
      return res.json(response);
    }
  })
});



app.post('/user/login', function(req, res, next) {
 passport.authenticate('local', function(err, user, info) {
   if (err) {
     return next(err);
   }
   if (!user) {
     return res.status(401).json({
       err: info
     });
   }
   req.logIn(user, function(err) {
     if (err) {
       return res.status(500).json({
         err: 'Could not log in user'
       });
     }
     res.status(200).json({
       status: 'Login successful!',
       user: user
     });
   });
 })(req, res, next);
});


app.post('/user/signup', function(req, res) {
 User.register(new User({ username: req.body.username, password: req.body.password }),
 req.body.password, function(err, account) {
   if (err) {
     return res.status(500).json({
       err: err
     });
   }
   passport.authenticate('local')(req, res, function () {
     return res.status(200).json({
       status: 'signup successful!'
     });
   });
 });
});

app.get('/user/logout', function(req, res) {
 req.logout();
 res.status(200).json({
   status: 'Bye!'
 });
});

// error handlers
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.end(JSON.stringify({
    message: err.message,
    error: {}
  }));
});

app.listen(port, function(){
  console.log('now listening on port: ' + port);
});
