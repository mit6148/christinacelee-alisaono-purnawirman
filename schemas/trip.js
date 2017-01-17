var mongoose = require('mongoose');

// TODO: Fill out the userSchema.
// Hint: a user is an object such as
//     {'username': 'Isaac', 'favoriteFruit': 'apple'}
var tripSchema = new mongoose.Schema({
  tripID: {type: String, required: true, index: {unique: true}},
  tripName: {type: String, required: true},
  tripCreator: {type: String, required: true},
  tripDestination: {type: String, required: true},
  tripType: {type: String, required: true},
  tripPhoto: String,
  tripDescription: String,
  tripLikedUsers: [String],
  tripStartTime: Date,
  tripEndTime: Date,
  tripStartBudget: Number,
  tripEndBudget: Number
});

var Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;
