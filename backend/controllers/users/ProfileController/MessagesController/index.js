const MessagesController = require('express').Router({mergeParams: true});
const verifyUser = require('../../../../middleware/verifyUser');
const verifyId = require('../../../../middleware/verifyId');

const {SendMessageHandler, UnreadCountHandler, SentMessagesHandler, ReceivedMessagesHandler, ReadMessageHandler, GetMessagesHandler} = require('./MessagesHandler');

MessagesController.post('/', verifyUser, SendMessageHandler);

MessagesController.get('/unread-count', verifyUser, UnreadCountHandler);

MessagesController.get('/sent', verifyUser, SentMessagesHandler);

MessagesController.get('/received', verifyUser, ReceivedMessagesHandler);

MessagesController.get('/:message', verifyUser, verifyId('message'), GetMessagesHandler);

MessagesController.post('/:message/set-read', verifyUser, verifyId('message'), ReadMessageHandler);

module.exports = MessagesController;
