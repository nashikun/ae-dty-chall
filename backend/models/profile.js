const mongoose = require('mongoose');
const friends = require('../mongoose-friends');
const Schema = mongoose.Schema;

const profileSchema = Schema({
  user: {type: Schema.Types.ObjectId, ref: 'user'},
  username: {type: String, index: {unique: true}},
  birthdate: Date,
  bio: {type: String, default: 'No Bio Added'},
  gender: String,
  location: String,
  picture: {type: String, default: 'https://api.ae-dty-chall.com/images/profiles/default.jpg'},
}, {
  timestamps: {createdAt: true, updatedAt: false}
});

profileSchema.index({user: 1}, {unique: true});

profileSchema.virtual('list', {ref: 'list', localField: 'user', foreignField: 'user', justOne: true});

// npm mongoose-friends plugin. Tweaked it to check the 'user' field instead of the _id field. I didn't test all
// funcionlities tho so some might need to be fixed
profileSchema.plugin(friends());

module.exports = mongoose.model('profile', profileSchema, 'profiles');

