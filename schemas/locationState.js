var mongoose = require('mongoose');

// TODO: Fill out the userSchema.
// Hint: a user is an object such as
//     {'username': 'Isaac', 'favoriteFruit': 'apple'}
var stateSchema = new mongoose.Schema({
  stateID: {type: Number, required: true, index: {unique: true}},
  stateName: {type: String, required: true},
  countryID: Number,
});

var State = mongoose.model('State', stateSchema);

module.exports = State;
