const mongoose = require('mongoose');

const AddUpvoteHandler = (req, res) => {
    mongoose.model('review').findOneAndUpdate({
        anime: req.params.anime,
        _id: req.params.review
    }, {$addToSet: {upvoters: req.user._id}}, {new: true})
        .exec((err, review) => {
            if (err) {
                console.error(err);
                return res.status(500).end()
            }
            if (!review) {
                return res.status(404).end();
            }
            return res.status(201).json({upvotesCount: review.upvotesCount});
        });
};

const RemoveUpvote = (req, res) => {
    if (!req.params.upvote === req.user._id.toString()) {
        return res.status(401).end()
    }
    mongoose.model('review').findOneAndUpdate({
        anime: req.params.anime,
        _id: req.params.review
    }, {$pull: {upvoters: req.params.upvote}}, {new: true})
        .exec((err, review) => {
            if (err) {
                console.error(err);
                return res.status(500).end()
            }
            if (!review) {
                return res.status(404).end()
            }
            return res.status(200).json({upvotesCount: review.upvotesCount})
        });
};

module.exports = {AddUpvoteHandler, RemoveUpvote};
