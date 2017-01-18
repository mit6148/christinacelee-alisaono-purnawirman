// load json file
var fs = require('fs');
var countries = JSON.parse(fs.readFileSync('./location_data/countries.json'));
var states = JSON.parse(fs.readFileSync('./location_data/states.json'));
var cities = JSON.parse(fs.readFileSync('./location_data/cities.json'));

// load models for location data
var City = require('../schemas/locationCity');
var StateModel = require('../schemas/locationState');
var Country = require('../schemas/locationCountry');

console.log(cities[0]);
// console.log(City);
var newCity = new City(cities[0]);
newCity.save();

City.findOne({'cityId': 1}, function(err, es){
	if(err){
      console.log(chalk.red("error in reading db"));
    }
    console.log(es);
  });

// City.collection.insertMany(cities);
// console.log("BBB")
// City.find({}, function(err, cities){
//     if(err){
//       console.log(chalk.red("error in reading db"));
//       return;
//     }
//     console.log(cities);
//   });
// console.log("CCC")
//   // State.insertMany(states);
// // Country.inserMany(countries);