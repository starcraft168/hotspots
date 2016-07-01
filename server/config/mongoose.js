var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');

//connect to the hotspot database



// mongoose.connect('mongodb://localhost/hotspot');
mongoose.connect('mongodb://hotspot:123@ds027719.mongolab.com:27719/heroku_0vjk4zkx');



//specify the path to the models AKA require()'ing files in models folder
var models_path = path.join(__dirname, './../models');

//readdirSync returns an array of filenames in that folder
//read all of the files in the models_path and for each one check if it is a javascript file before requiring it
fs.readdirSync(models_path).forEach(function(file) {
	if(file.indexOf('js') > 0) {
		require(models_path + '/' + file);
	}
});
