//here we create our mongoose schemas

var mongoose = require('mongoose');
mongoose.connect('http://127.0.0.1:9090');

//initiate connection
var db = mongoose.connection;
//listen to see if we get an error
db.on('error', console.error.bind(console, 'connectin\' err\'r: '));
//if connection is successful...
db.once('open', function(callback){

  var links = mongoose.Schema({
    id : {type: mongoose.Schema.Types.ObjectId, required: true, turnOn: true},
    url: String,
    base_url: String,
    code: String,
    title: String,
    visits: {type: Number, default: 0},
    timestamp: {type: Date, default: Date.now}
  });

  var Link = mongoose.model('Link', links);
  

  var users = mongoose.Schema({
    id : {type: mongoose.Schema.Types.ObjectId, required: true, turnOn: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    timestamp: {type: Date, default: Date.now}
  });
  
  var User = mongoose.model('User', users);
}) 

module.exports = db;
