var express = require('express');
var sessions = require('express-sessions');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var app = express();
var port = 8040;

app.use(express.static(__dirname));
app.use(cors());
app.use(bodyParser.json());

mongoose.set("debug", true);
mongoose.connect("mongodb://localhost/");
mongoose.connection.once("open", function(){
  console.log("connected to mongodb");
});

app.get('/api/video', function(req, res){
  var query;
  if(req.query.status){
    query = {status: req.query.status}
  }else{
    query = [];
  };
  Video.find(query, function(err, video){
    return res.send(video);
  })
});
app.post('/api/video', function(req, res){
  var video = new video(req.body);
  video.save(function(err, s){
    return err ? res.status(500).send(err) : res.send(s);
  });
});
app.put('/api/video', function(req, res){
  video.findByIdAndUpdate(req.query.id, function(err, video){
    if(err){
      return res.status(500).send(err)
    }else{
      video.findById(req.query.id, function(err, video){
        return res.send();
      })
    }
  })
});
app.delete('/api/video', function(req, res){
  if(!req.query.id){
    return res.status(400).send('id query needed');
  }
  Video.findByIdAndRemove(req.query.id, function(error, response){
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
