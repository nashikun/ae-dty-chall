const mongoose = require('mongoose');

const animeSchema = mongoose.Schema({
  name: {type: String, default: '', required: [true, "enter a name"]},
  description: {type: String, default: ''},
  episodes: {type: Number, required: true},
  views: {type: Number, default: 0},
  image: {type: String, default: ''},
  releaseDate: Date
});

/*animeSchema.post('save', function(){
  cachegoose.clearCache('animes');
});*/

animeSchema.virtual('reviewsCount', {ref: 'reviews', localField: '_id', foreignField: 'anime', count: true});

animeSchema.virtual('reviews', {ref: 'reviews', localField: '_id', foreignField: 'anime'});

module.exports = mongoose.model('anime', animeSchema, 'animes');
