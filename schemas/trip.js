var mongoose = require('mongoose');

// TODO: Fill out the userSchema.
// Hint: a user is an object such as
//     {'username': 'Isaac', 'favoriteFruit': 'apple'}
var tripSchema = new mongoose.Schema({
  tripID: {type: String, required: true, index: {unique: true}},
  tripName: {type: String, required: true},
  tripCreator: {type: String, required: true},
  tripDestinationID: {type: String, required: true},
  tripDestinationName: {type: String, required: true},
  tripType: {type: String, required: true},
  tripPhoto: String,
  tripDescription: String,
  tripLikedUsers: [String],
  tripSeason: String,
  tripDuration: Number,
  tripStartBudget: Number,
  tripEndBudget: Number
});

var Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;
