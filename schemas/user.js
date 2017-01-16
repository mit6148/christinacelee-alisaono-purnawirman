var mongoose = require('mongoose');

// TODO: Fill out the userSchema.
// Hint: a user is an object such as
//     {'username': 'Isaac', 'favoriteFruit': 'apple'}
var userSchema = new mongoose.Schema({
  userID: {type: String, required: true, index: {unique: true}},
  name: {type: String, required: true},
  photo: String,
  description: String,
  destination: [String],
  likedTrip: [String],
  createdTrip: [String],
});

var User = mongoose.model('User', userSchema);

module.exports = User;
