const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

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
        return res.status(404).end();
    }
    let reviews = anime.reviews;
    reviews = reviews.map(review => {
        review.set('upvoted', review.hasUpvoted(req.user._id), {strict: false});
        return review
    });
    const NumberReviews = reviews.length;
    let userReview = null;
    if (req.user._id) {
        for (let i = 0; i < NumberReviews; i += 1) {
            if (reviews[i].reviewer.user.equals(req.user._id)) {
                userReview = reviews.splice(i, 1)[0];
                break
            }
        }
    }
    console.log(reviews);
    res.status(200).json({reviews: reviews, userReview: userReview});
};

const PostReviewHandler = async (req, res) => {
    mongoose.model('review').create({reviewerId: req.user._id, review: req.body.review, anime: req.params.anime})
        .then(result => res.status(201).json(result))
        .catch(err => {
            console.error(err);
            res.status(500).end();
        })
};

const EditReviewHandler = (req, res) => {
    mongoose.model('review').updateOne({
        _id: req.params.review,
        anime: req.params.anime,
        reviewerId: req.user._id
    }, {$set: {review: req.body.review}})
        .exec((err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).end();
            }
            if (result.n) {
                return res.status(204).end();
            }
            return res.status(404).end();
        });
};

const RemoveReviewHandler = (req, res) => {
    mongoose.model('review').findOne({
            _id: req.params.review,
            anime: req.params.anime
        }, (err, review) => {
            if (err) {
                console.error(err);
                return res.status(500).end();
            }
            if (review) {
                if (review.reviewerId.equals(req.user._id) || req.user.role === 'admin') {
                    review.remove();
                    return res.status(204).end();
                }
                return res.status(401).end()
            }
            return res.status(404).end()
        }
    );
};

module.exports = {GetReviewsHandler, PostReviewHandler, EditReviewHandler, RemoveReviewHandler};
