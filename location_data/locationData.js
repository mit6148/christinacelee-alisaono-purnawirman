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
var Destination = require('../schemas/destination');

// connecting to database 
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/test');
var connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));
connection.on('connected', function() {
  console.log('database connected!');
});

// fill in per batches
// var batch = 999;
var BATCH = 999;
// var fillJsonToDB = function(jsonData, model){
var fillJsonToDB = function(jsonData, model, batch=BATCH){
	var k;
	for(k = 0; k <= Math.floor(jsonData.length / batch); k++){
	model.collection.insertMany(jsonData.slice(k * batch, Math.max((k + 1) * batch, jsonData.length),
		function(err, docs){
			if(err){
				console.log("Error in inserting")
			}
		} ));
	}
};
fillJsonToDB(countries, Country);
fillJsonToDB(states, State);
fillJsonToDB(cities, City);



mongoose.connection.close();