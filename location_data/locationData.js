// This is a script to fill in location information on the database
// TODO: cities are not included all for some reason

// load json file
var fs = require('fs');
var countries = JSON.parse(fs.readFileSync('./location_data/countries.json'));
var states = JSON.parse(fs.readFileSync('./location_data/states.json'));
var cities = JSON.parse(fs.readFileSync('./location_data/cities.json'));

// load models for location data
var City = require('../schemas/locationCity');
var State = require('../schemas/locationState');
var Country = require('../schemas/locationCountry');

// connecting to database 
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/test');
var connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));
connection.on('connected', function() {
  console.log('database connected!');
});

var batch = 999;
var k;
for(k = 0; k <= Math.floor(cities.length / batch); k++){
	City.collection.insertMany(cities.slice(k * batch, Math.max((k + 1) * batch, cities.length),
		function(err, docs){
			if(err){
				console.log("Error in cities insert");
			}
		}));
}

for(k = 0; k <= Math.floor(states.length / batch); k++){
	State.collection.insertMany(states.slice(k * batch, Math.max((k + 1) * batch, states.length),
		function(err, docs){
			if(err){
				console.log("Error in states insert");
			}
		} ));
}

for(k = 0; k <= Math.floor(countries.length / batch); k++){
	Country.collection.insertMany(countries.slice(k * batch, Math.max((k + 1) * batch, countries.length),
		function(err, docs){
			if(err){
				console.log("Error in country insert")
			}
		} ));
}

mongoose.connection.close();