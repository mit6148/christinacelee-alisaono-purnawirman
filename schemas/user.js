var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

// TODO: Fill out the userSchema.
// Hint: a user is an object such as
//     {'username': 'Isaac', 'favoriteFruit': 'apple'}
var userSchema = new mongoose.Schema({
  userID: {type: String, required: true, index: {unique: true}},
  userName: {type: String, required: true},
  userEmail: String,
  userPhoto: String,
  userDescription: String,
  userActive: {type: Boolean, default: true},
  userDestinations: {type: [String], default: []},
  userLikedTrips: {type: [ObjectId], default: []},
  userCreatedTrips: {type: [ObjectId], default: []},
});

var User = mongoose.model('User', userSchema);

module.exports = User;
