const verifyUser = require('../../../util/verifyUser');
const verifyAdmin = require('../../../util/verifyAdmin');
const verifyId = require('../../../util/verifyId');

const {GetReviewsHandler, PostReviewHandler, EditReviewHndler, RemoveReviewHandler} = require('./ReviewsHandlers');
const UpvotesController = require('./upvotes-controller');
const ReviewsController = require('express').Router({mergeParams: true});

ReviewsController.get('/', (req, res, next) => {
    if (!req.headers.authorization || req.headers.authorization.split(' ')[1] === 'null') {
        req.userId = null;
        next();
    } else {
        verifyUser(req, res, next);
    }
}, GetReviewsHandler);

ReviewsController.post('/', verifyUser, PostReviewHandler);

ReviewsController.patch('/:review', verifyUser, verifyId('review'), (req, res, next) => {
    if (req.params.user === req.userId.toString()) next();
    else verifyAdmin(req, res, next)
}, EditReviewHndler);

ReviewsController.delete('/:review', verifyUser, verifyId('review'), RemoveReviewHandler);

ReviewsController.use('/:review/upvotes', verifyUser, verifyId('review'), UpvotesController);

module.exports = ReviewsController;
