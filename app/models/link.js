var db = require('../config');
var mongoose = require('mongoose');
// var db = require('../../data/config.js');
var crypto = require('crypto');

var links = mongoose.Schema({
  url: String,
  base_url: String,
  code: String,
  title: String,
  visits: {type: Number, default: 0},
  timestamp: {type: Date, default: Date.now}
});

links.pre('save', function(next) {
  var shasum = crypto.createHash('sha1');
  shasum.update(this.url);
  this.code = shasum.digest('hex').slice(0, 5);
  next();
});

var Link = mongoose.model('Link', links);
// var Link = db.Model.extend({
//   tableName: 'urls',
//   hasTimestamps: true,
//   defaults: {
//     visits: 0
//   },
//   initialize: function(){
//     this.on('creating', function(model, attrs, options){
//       var shasum = crypto.createHash('sha1');
//       shasum.update(model.get('url'));
//       model.set('code', shasum.digest('hex').slice(0, 5));
//     });
//   }
// });

module.exports = Link;
