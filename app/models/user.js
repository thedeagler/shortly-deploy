var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var mongoose = require('mongoose');

var users = mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  timestamp: {type: Date, default: Date.now()}
});


users.methods.comparePassword = function(attemptedPassword, callback) {
  this.hashPassword().then(function() {
    bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
      if(err) { callback(err) }
      else { callback(null, isMatch) }
    });
  });
};

users.methods.hashPassword = function() {
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
    .then(function(hash) {
      this.password = hash;
    });
};

var User = mongoose.model('User', users);

module.exports = User;
