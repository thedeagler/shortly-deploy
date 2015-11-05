//here we create our mongoose schemas

var mongoose = require('mongoose');
mongoose.connect(/*databse server ip?*/);

//initiate connection
var db = mongoose.connection;
//listen to see if we get an error
db.on('error', console.error.bind(console, 'connectin\' err\'r: '));
//if connection is successful...
db.once('open', function(callback){

  //create collections
  var Links = mongoose.Schema({
    id : Number,
    url: String,
    base_url: String,
    code: String,
    title: String,
    visits: Number
    timestamp: Date
  });
  
  var Users = mongoose.Schema({
    id: Number,
    username: String,
    password: String,
    timestamp: Date
  });

  //create models
  var Link;
  //yay!
}) 