var mongoose = require('mongoose');

// TODO: Fill out the userSchema.
// Hint: a user is an object such as
//     {'username': 'Isaac', 'favoriteFruit': 'apple'}
var destinationSchema = new mongoose.Schema({
  destinationID: {type: String, required: true, index: {unique: true}},
  destinationName: {type: String, required: true},
  tabies: {type: [String], default: []},
  buddies: {type: [String], default: []},
});

var Destination = mongoose.model('Destination', destinationSchema);

module.exports = Destination;
