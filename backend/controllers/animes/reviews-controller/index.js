const passport = require('passport');
const verifyId = require('../../../util/verifyId');

const {GetReviewsHandler, PostReviewHandler, EditReviewHandler, RemoveReviewHandler} = require('./ReviewsHandlers');
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
    else res.status(401).end()
}, EditReviewHandler);

ReviewsController.delete('/:review', passport.authenticate('jwt', {session: false}), verifyId('review'), (req, res, next) => {
    if (req.params.user === req.user._id.toString() || req.user.role === 'admin') next();
    else res.status(401).end()
}, RemoveReviewHandler);

ReviewsController.use('/:review/upvotes', passport.authenticate('jwt', {session: false}), verifyId('review'), UpvotesController);

module.exports = ReviewsController;
