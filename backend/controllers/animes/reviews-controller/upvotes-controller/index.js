const UpvotesController = require('express').Router({mergeParams: true});
const {AddUpvoteHandler, RemoveUpvote} = require('./UpvotesHandlers');

const verifyId = require('../../../../util/verifyId');

UpvotesController.post('/', AddUpvoteHandler);

UpvotesController.delete('/:upvote', verifyId('upvote'), RemoveUpvote);

module.exports = UpvotesController;
