var mongoose = require('mongoose');

// TODO: Fill out the userSchema.
// Hint: a user is an object such as
//     {'username': 'Isaac', 'favoriteFruit': 'apple'}
var destinationSchema = new mongoose.Schema({
  destinationName: {type: String, required: true, index: {unique: true}},
  trips: [String],
  buddies: [String]
});

var Destination = mongoose.model('Destination', destinationSchema);

module.exports = Destination;
