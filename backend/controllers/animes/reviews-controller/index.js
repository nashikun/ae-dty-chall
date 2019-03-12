const passport = require('passport');
const verifyAdmin = require('../../../util/verifyAdmin');
const verifyId = require('../../../util/verifyId');

const {GetReviewsHandler, PostReviewHandler, EditReviewHndler, RemoveReviewHandler} = require('./ReviewsHandlers');
const UpvotesController = require('./upvotes-controller');
const ReviewsController = require('express').Router({mergeParams: true});

ReviewsController.get('/', (req, res, next) => {
    if (!req.headers.authorization || req.headers.authorization.split(' ')[1] === 'null') {
        req.user._id = null;
        next();
    } else {
        passport.authenticate('jwt', {session: false})(req, res, next);
    }
}, GetReviewsHandler);

ReviewsController.post('/', passport.authenticate('jwt', {session: false}), PostReviewHandler);

ReviewsController.patch('/:review', passport.authenticate('jwt', {session: false}), verifyId('review'), (req, res, next) => {
    if (req.params.user === req.user._id.toString()) next();
    else verifyAdmin(req, res, next)
}, EditReviewHndler);

ReviewsController.delete('/:review', passport.authenticate('jwt', {session: false}), verifyId('review'), RemoveReviewHandler);

ReviewsController.use('/:review/upvotes', passport.authenticate('jwt', {session: false}), verifyId('review'), UpvotesController);

module.exports = ReviewsController;
