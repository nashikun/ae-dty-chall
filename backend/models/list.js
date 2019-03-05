const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = mongoose.Schema({
    user: {type: Schema.Types.ObjectId, ref: 'user'},
    animelist: [{
      _id: false,
      anime: {type: Schema.Types.ObjectId, ref: 'anime'},
      status: String,
      watchedEpisodes: Number,
      rating: Number
    }]
  }
);

listSchema.index({user: 1}, {unique: true});

module.exports = mongoose.model('list', listSchema, 'lists');
