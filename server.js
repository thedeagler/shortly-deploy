var app = require('./server-config.js');


//lauren changed this. not sure if it works
var port = process.env.PORT || 8080;
// var port = 8080;

app.listen(port);

console.log('Server now listening on port ' + port);
