var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var users = mongoose.Schema({
  id : {type: mongoose.Schema.Types.ObjectId, required: true, turnOn: true},
  username: {type: String, required: true},
  password: {type: String, required: true},
  timestamp: {type: Date, default: Date.now()}
});


users.methods.comparePassword = function() {
  bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
    if(err) { callback(err) };
    else { callback(isMatch) };
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

// var User = db.Model.extend({
//   tableName: 'users',
//   hasTimestamps: true,
//   initialize: function(){
//     this.on('creating', this.hashPassword);
//   },
//   comparePassword: function(attemptedPassword, callback) {
//     bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
//       callback(isMatch);
//     });
//   },
//   hashPassword: function(){
//     var cipher = Promise.promisify(bcrypt.hash);
//     return cipher(this.get('password'), null, null).bind(this)
//       .then(function(hash) {
//         this.set('password', hash);
//       });
//   }
// });

module.exports = User;
