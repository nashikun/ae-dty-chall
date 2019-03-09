const mongoose = require('mongoose');

const GetReviewsHandler = async (req, res) => {
    let anime = await mongoose.model('anime').findById(req.params.anime)
        .populate({
            path: 'reviews',
            model: 'review',
            populate: {path: 'reviewer', model: 'profile', select: 'user username picture'},
            options: {sort: {'upvotesCount': 1}}
        })
        .exec()
        .catch(err => {
            console.error(err);
            res.status(500).end();
        });
    if (!anime) {
        res.status(404).end();
    } else {
        let reviews = anime.reviews;
        reviews = reviews.map(review => {
            review.set('upvoted', review.hasUpvoted(req.userId), {strict: false});
            return review
        });
        const NumberReviews = reviews.length;
        let userReview = null;
        if (req.userId) {
            for (let i = 0; i < NumberReviews; i += 1) {
                if (reviews[i].reviewer.user.equals(req.userId)) {
                    userReview = reviews.splice(i, 1)[0];
                    break
                }
            }
        }
        res.status(200).json({reviews: reviews, userReview: userReview});
    }
};

const PostReviewHandler = async (req, res) => {
    mongoose.model('review').create({reviewerId: req.userId, review: req.body.review, anime: req.params.anime})
        .then(result => res.status(201).json(result))
        .catch(err => {
            console.error(err);
            res.status(500).end();
        })
};

const EditReviewHndler = (req, res) => {
    mongoose.model('review').updateOne({
        _id: req.params.review,
        anime: req.params.anime
    }, {$set: {review: req.body.review}})
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

const RemoveReviewHandler = (req, res) => {
    mongoose.model('review').deleteOne({
        _id: req.params.review,
        anime: req.params.anime
    }, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).end()
        } else {
            console.log(req.params.user);
            if (result.n) {
                res.status(204).end()
            } else {
                res.status(404).end()
            }
        }
    });
};

module.exports = {GetReviewsHandler, PostReviewHandler, EditReviewHndler, RemoveReviewHandler};
