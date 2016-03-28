var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var flash = require('connect-flash');
var bcrypt = require('bcrypt-nodejs');
var morgan = require('morgan');
var config = require('./config/passport.js');
var app = express();
var passport
var port = 8034;
var Videos = require('./server/videos');
var Members = require('./server/user');



app.use(express.static(__dirname));
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cookieParser());

app.set('view engine', 'ejs');


app.use(session({secret: 'hopethisallworkswiththethings'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());



mongoose.set("debug", true);
mongoose.connect("mongodb://localhost/");
mongoose.connection.once("open", function(){
  console.log("connected to mongodb");
});



//**videos**
app.get('/api/videos', function(req, res){
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
app.post('/api/videos', function(req, res){
  var videos = new Videos(req.body);
  videos.save(function(err, s){
    return err ? res.status(500).send(err) : res.send(s);
  });
});
app.put('/api/videos', function(req, res){
  videos.findByIdAndUpdate(req.query.id, function(err, videos){
    if(err){
      return res.status(500).send(err)
    }else{
      videos.findById(req.query.id, function(err, videos){
        return res.send();
      })
    }
  })
});
app.delete('/api/videos', function(req, res){
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


//**members**

app.get('/api/members', function(req, res){
  var query;
  if(req.query.status){
    query = {status: req.query.status}
  }else{
    query =  [];
  };
  Members.find(query, function(err, members){
    return res.send(members);
  })
});
app.post('/api/members', function(req, res){
  var members = new members(req.body);
  members.save(function(err, s){
    return err ? res.status(500).send(err) : res.send(s);
  })
});
app.put('/api/members', function(req, res){
  members.findByIdAndUpdate(req.query.id, function(err, members){
    if(err){
      return res.status(500).send(err);
    }else{
      video.findById(req.res.id, function(err, members){
        return res.send();
      })
    }
  })
});
app.delete('/api/members', function(req, res){
  if(!req.query.id){
    return res.status(400).send('enter in correct format ?id=');
  }
  Members.findByIdAndRemove(req.query.id, function(error, response){
    if(error){
      return res.status(500).json(error);
    }else{
      return res.json(response);
    }
  })
});


app.listen(port, function(){
  console.log('now listening on port: ' + port);
});
