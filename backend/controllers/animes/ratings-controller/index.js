const {ChangeRatingHandler, PostRatingHandler} = require("./RatingsHandlers");
const verifyId = require('../../../util/verifyId');
const isAuthenticated = require('../../../util/isAuthenticated');

const RatingsController = require('express').Router({mergeParams: true});

RatingsController.post('/', isAuthenticated, PostRatingHandler);

RatingsController.put('/:rating', isAuthenticated, verifyId('rating'), ChangeRatingHandler);

module.exports = RatingsController;
