var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

// TODO: Fill out the userSchema.
// Hint: a user is an object such as
//     {'username': 'Isaac', 'favoriteFruit': 'apple'}
var destinationSchema = new mongoose.Schema({
  destinationID: {type: String, required: true, index: {unique: true}},
  destinationName: {type: String, required: true},
  tabies: {type: [ObjectId], default: []},
  buddies: {type: [String], default: []},
});

var Destination = mongoose.model('Destination', destinationSchema);

module.exports = Destination;
