const {ChangeRatingHandler, PostRatingHandler} = require("./RatingsHandlers");
const verifyUser = require('../../../middleware/verifyUser');
const verifyId = require('../../../middleware/verifyId');
const RatingsController = require('express').Router({mergeParams: true});

RatingsController.post('/', verifyUser, PostRatingHandler);

RatingsController.put('/:rating', verifyUser, verifyId('rating'), ChangeRatingHandler);

module.exports = RatingsController;
