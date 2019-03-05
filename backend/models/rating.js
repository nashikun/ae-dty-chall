const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const ratingSchema = new mongoose.Schema(
  {
    user: {type: ObjectId, ref: 'users', required: true},
    anime: {type: ObjectId, ref: 'animes', required: true},
    rating: {type: Number, required: true, min: 1, max: 10, validate: {validator: Number.isInteger}}
  },
);

ratingSchema.index({user: 1, anime: 1}, {unique: true});

module.exports = mongoose.model('rating', ratingSchema, 'ratings');

