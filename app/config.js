var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017');

//initiate connection
var db = mongoose.connection;
//listen to see if we get an error
db.on('error', console.error.bind(console, 'connectin\' err\'r: '));
//if connection is successful...
db.once('open', function(callback){

  // var links = mongoose.Schema({
  //   id : {type: mongoose.Schema.Types.ObjectId, required: true, turnOn: true},
  //   url: String,
  //   base_url: String,
  //   code: String,
  //   title: String,
  //   visits: {type: Number, default: 0},
  //   timestamp: {type: Date, default: Date.now}
  // });

  // var Link = mongoose.model('Link', links);
  

  // var users = mongoose.Schema({
  //   id : {type: mongoose.Schema.Types.ObjectId, required: true, turnOn: true},
  //   username: {type: String, required: true},
  //   password: {type: String, required: true},
  //   timestamp: {type: Date, default: Date.now}
  // });
  
  // var User = mongoose.model('User', users);
}) 

module.exports = db;


// var Bookshelf = require('bookshelf');
// var path = require('path');

// var db = Bookshelf.initialize({
//   client: 'sqlite3',
//   connection: {
//     host: '127.0.0.1',
//     user: 'your_database_user',
//     password: 'password',
//     database: 'shortlydb',
//     charset: 'utf8',
//     filename: path.join(__dirname, '../db/shortly.sqlite')
//   }
// });

// db.knex.schema.hasTable('urls').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('urls', function (link) {
//       link.increments('id').primary();
//       link.string('url', 255);
//       link.string('base_url', 255);
//       link.string('code', 100);
//       link.string('title', 255);
//       link.integer('visits');
//       link.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

// db.knex.schema.hasTable('users').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('users', function (user) {
//       user.increments('id').primary();
//       user.string('username', 100).unique();
//       user.string('password', 100);
//       user.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

// module.exports = db;
//  