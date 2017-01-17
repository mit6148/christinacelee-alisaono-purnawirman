var mongoose = require('mongoose');

// TODO: Fill out the userSchema.
// Hint: a user is an object such as
//     {'username': 'Isaac', 'favoriteFruit': 'apple'}
var destinationSchema = new mongoose.Schema({
  destinationID: {type: String, required: true, index: {unique: true}},
  country: {type: String, required: true},
  state: {type: String},
  city: {type: STring, required: true},
  tabies: [String],
  buddies: [String]
});

var Destination = mongoose.model('Destination', destinationSchema);

module.exports = Destination;
