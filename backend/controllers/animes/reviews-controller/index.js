const verifyId = require('../../../util/verifyId');

const {GetReviewsHandler, PostReviewHandler, EditReviewHandler, RemoveReviewHandler} = require('./ReviewsHandlers');
const isAuthenticated = require('../../../util/isAuthenticated');
const UpvotesController = require('./upvotes-controller');
const ReviewsController = require('express').Router({mergeParams: true});

ReviewsController.get('/', (req, res) => {
    if (!req.user) {
        req.user = {_id: null};
    }
    GetReviewsHandler(req, res)
});

ReviewsController.post('/', isAuthenticated, PostReviewHandler);

ReviewsController.patch('/:review', isAuthenticated, verifyId('review'), EditReviewHandler);

ReviewsController.delete('/:review', isAuthenticated, verifyId('review'), RemoveReviewHandler);

ReviewsController.use('/:review/upvotes', isAuthenticated, verifyId('review'), UpvotesController);

module.exports = ReviewsController;
