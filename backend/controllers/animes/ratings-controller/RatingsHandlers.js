const mongoose = require('mongoose');

const PostRatingHandler = (req, res) => {
  mongoose.model('rating').create({user: req.userId, rating: req.body.rating, anime: req.params.anime})
    .then(result => res.status(201).send(result))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    })
};

const ChangeRatingHandler = (req, res) => {
  mongoose.model('rating').updateOne({
    _id: req.params.rating,
    anime: req.params.anime,
    user: req.userId
  }, {$set: {rating: req.body.rating}})
    .exec((err, result) => {
      if (err) {
        console.error(err);
        res.status(500).end();
      } else {
        if (result.n) {
          res.status(204).end();
        } else {
          res.status(404).end();
        }
      }
    });
};

module.exports = {PostRatingHandler, ChangeRatingHandler};
