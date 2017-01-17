var mongoose = require('mongoose');

// TODO: Fill out the userSchema.
// Hint: a user is an object such as
//     {'username': 'Isaac', 'favoriteFruit': 'apple'}
var userSchema = new mongoose.Schema({
  userID: {type: String, required: true, index: {unique: true}},
  userName: {type: String, required: true},
  userPhoto: String,
  userDescription: String,
  userDestinationID: [String],
  userLikedTrip: [String],
  userCreatedTrip: [String],
});

var User = mongoose.model('User', userSchema);

module.exports = User;
