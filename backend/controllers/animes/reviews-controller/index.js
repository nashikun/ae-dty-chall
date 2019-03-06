const verifyUser = require('../../../middleware/verifyUser');
const verifyId = require('../../../middleware/verifyId');

const {GetReviewsHandler, PostReviewHandler, EditReviewHndler, RemoveReviewHandler} = require('./ReviewsHandlers');
const UpvotesController = require('./upvotes-controller');
const ReviewsController = require('express').Router({mergeParams: true});

ReviewsController.get('/', (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[1] === 'null') {
    req.userId = null;
    next();
  } else {
    verifyUser(req, res, next);
  }
}, GetReviewsHandler);

ReviewsController.post('/', verifyUser, PostReviewHandler);

ReviewsController.patch('/:review', verifyId('review'), verifyUser, EditReviewHndler);

ReviewsController.delete('/:review', verifyId('review'), verifyUser, RemoveReviewHandler);

ReviewsController.use('/:review/upvotes', verifyId('review'), verifyUser, UpvotesController);

module.exports = ReviewsController;
