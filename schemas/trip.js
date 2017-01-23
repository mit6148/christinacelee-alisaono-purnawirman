var mongoose = require('mongoose');

// TODO: Fill out the userSchema.
// Hint: a user is an object such as
//     {'username': 'Isaac', 'favoriteFruit': 'apple'}
var tripSchema = new mongoose.Schema({
  tripID: {type: String, required: true, index: {unique: true}},
  tripName: {type: String, required: true},
  tripCreatorID: {type: String, required: true},
  tripCreatorName: {type: String, required: true},
  tripDestinationID: {type: String, required: true},
  tripDestinationName: {type: String, required: true},
  tripType: {type: String, required: true},
  tripActive: {type: Boolean, default: true},
  tripPhoto: String,
  tripDescription: String,
  tripLikedUsers: {type: [String], default: []},
  tripSeason: String,
  tripDuration: String,
  tripBudget: String,
});

var Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;
