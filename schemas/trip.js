var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

// TODO: Fill out the userSchema.
// Hint: a user is an object such as
//     {'username': 'Isaac', 'favoriteFruit': 'apple'}
var tripSchema = new mongoose.Schema({
  tripID: {type: ObjectId, required: true, index: {unique: true}},
  tripName: {type: String, required: true},
  tripCreatorID: {type: String, required: true},
  tripCreatorName: {type: String, required: true},
  tripDestinationID: {type: String, required: true},
  tripDestinationName: {type: String, required: true},
  tripType: {type: [String], required: true, default:[]},
  tripActive: {type: Boolean, default: true},
  tripPhoto: String,
  tripDescription: String,
  tripLikedUsers: {type: [String], default: []},
  tripSeason: {type: [String], default: []},
  tripDuration: {type: Number, default: 0},
  tripBudget: {type: Number, default: 0},
});

var Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;
