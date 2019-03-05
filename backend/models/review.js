const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const Objectoptions = {
  virtuals: true, transform: (doc, ret, options) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.upvoters;
    delete ret.anime;
    return ret
  }
};

const reviewSchema = new mongoose.Schema(
  {
    anime: {type: ObjectId, ref: 'animes'},
    review: {type: String, default: ''},
    reviewerId: {type: ObjectId, ref: 'users', required: true},
    upvoters: {type: [{type: ObjectId, ref: 'users', match: {$ne: '$reviewer'}}], default: []},
  },
  {
    toObject: Objectoptions,
    toJSON: Objectoptions,
  },
);

reviewSchema.index({reviewerId: 1, anime: 1}, {unique: true});

reviewSchema.virtual('reviewer', {
  ref: 'profile',
  localField: 'reviewerId',
  foreignField: 'user',
  select: 'username picture',
  justOne: true
});

reviewSchema.virtual('upvotesCount').get(function () {
  return this.upvoters.length
});

reviewSchema.methods.hasUpvoted = function (authedUserId) {
  return this.upvoters.some(upvoterObjectID => upvoterObjectID.equals(authedUserId));
};

module.exports = mongoose.model('review', reviewSchema, 'reviews');

