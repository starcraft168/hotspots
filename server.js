var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json()); //for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); //for parsing application/x-www-form-urlencoded

var path = require('path');
//set up a static file server that points to the client directory
app.use(express.static(path.join(__dirname, './www')));

//import mongoose.js
require('./server/config/mongoose.js');

//pass in app to routes.js
require('./server/config/routes.js')(app);

//Heroku Deployment purposes
var port = Number(process.env.PORT || 3000);

// app.all("http://gentle-spire-1503.herokuapp.com/", function (req, res, next) {
//     response.header("Access-Control-Allow-Origin", "*");
//     response.header("Access-Control-Allow-Headers", "Content-Type");
//     response.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
//     return next();
// });

app.listen(port, function() {
	console.log('listening at port 3000');
});
