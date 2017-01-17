var mongoose = require('mongoose');

// TODO: Fill out the userSchema.
// Hint: a user is an object such as
//     {'username': 'Isaac', 'favoriteFruit': 'apple'}
var countrySchema = new mongoose.Schema({
  countryID: {type: Number, required: true, index: {unique: true}},
  countryName: {type: String, required: true},
  countryShort: String,
});

var Country = mongoose.model('Country', countrySchema);

module.exports = Country;
