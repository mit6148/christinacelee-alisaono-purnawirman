var mongoose = require('mongoose');

// TODO: Fill out the userSchema.
// Hint: a user is an object such as
//     {'username': 'Isaac', 'favoriteFruit': 'apple'}
var tripSchema = new mongoose.Schema({
  tripID: {type: String, required: true, index: {unique: true}},
  name: {type: String, required: true},
  photo: String,
  description: String,
  destination: {type: String, required: true},
  likedUsers: [String],
  startTime: Date,
  endTime: Date,
  type: {type: String, required: true},
  startBudget: Number,
  endBudget: Number
});

var Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;
