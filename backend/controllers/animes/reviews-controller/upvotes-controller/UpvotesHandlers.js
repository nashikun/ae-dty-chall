const mongoose = require('mongoose');

const AddUpvoteHandler = (req, res) => {
  mongoose.model('review').findOneAndUpdate({
    anime: req.params.anime,
    _id: req.params.review
  }, {$addToSet: {upvoters: req.userId}}, {new: true})
    .exec((err, review) => {
      if (err) {
        console.error(err);
        res.status(500).end()
      } else {
        if (!review) {
          res.status(404).end();
        } else {
          res.status(201).json({upvotesCount: review.upvotesCount});
        }
      }
    });
};

const RemoveUpvote = (req, res) => {
  if (!req.params.upvote === req.userId.toString()) {
    res.status(401).end()
  } else {
    mongoose.model('review').findOneAndUpdate({
      anime: req.params.anime,
      _id: req.params.review
    }, {$pull: {upvoters: req.params.upvote}}, {new: true})
      .exec((err, review) => {
        if (err) {
          console.error(err);
          res.status(500).end()
        } else {
          if (!review) {
            res.status(404).end()
          } else {
            res.status(200).json({upvotesCount: review.upvotesCount})
          }
        }
      });
  }
};

module.exports = {AddUpvoteHandler, RemoveUpvote};
