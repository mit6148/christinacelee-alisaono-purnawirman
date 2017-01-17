var mongoose = require('mongoose');

// TODO: Fill out the userSchema.
// Hint: a user is an object such as
//     {'username': 'Isaac', 'favoriteFruit': 'apple'}
var citySchema = new mongoose.Schema({
  cityID: {type: Number, required: true, index: {unique: true}},
  cityName: {type: String, required: true},
  stateID: Number,
});

var City = mongoose.model('City', citySchema);

module.exports = City;
