const MessagesController = require('express').Router({mergeParams: true});
const verifyUser = require('../../../../util/verifyUser');
const verifyId = require('../../../../util/verifyId');

const {SendMessageHandler, UnreadCountHandler, SentMessagesHandler, ReceivedMessagesHandler, ReadMessageHandler, GetMessagesHandler} = require('./MessagesHandler');

MessagesController.post('/', verifyUser, SendMessageHandler);

MessagesController.get('/unread-count', verifyUser, UnreadCountHandler);

MessagesController.get('/sent', verifyUser, SentMessagesHandler);

MessagesController.get('/received', verifyUser, ReceivedMessagesHandler);

MessagesController.get('/:message', verifyUser, verifyId('message'), GetMessagesHandler);

MessagesController.post('/:message/set-read', verifyUser, verifyId('message'), ReadMessageHandler);

module.exports = MessagesController;
