const {ChangeRatingHandler, PostRatingHandler} = require("./RatingsHandlers");
const passport = require('passport');
const verifyId = require('../../../util/verifyId');
const RatingsController = require('express').Router({mergeParams: true});

RatingsController.post('/', passport.authenticate('jwt', {session: false}), PostRatingHandler);

RatingsController.put('/:rating', passport.authenticate('jwt', {session: false}), verifyId('rating'), ChangeRatingHandler);

module.exports = RatingsController;
