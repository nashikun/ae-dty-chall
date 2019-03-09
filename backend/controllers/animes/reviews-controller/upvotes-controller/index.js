const UpvotesController = require('express').Router({mergeParams: true});
const {AddUpvoteHandler, RemoveUpvote} = require('./UpvotesHandlers');

const verifyId = require('../../../../middleware/verifyId');

UpvotesController.post('/', AddUpvoteHandler);

UpvotesController.delete('/:upvote', verifyId('upvotes'), RemoveUpvote);

module.exports = UpvotesController;
