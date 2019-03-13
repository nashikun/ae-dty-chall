const MessagesController = require('express').Router({mergeParams: true});
const isAuthenticated = require('../../../../util/isAuthenticated');
const verifyId = require('../../../../util/verifyId');

const {SendMessageHandler, UnreadCountHandler, SentMessagesHandler, ReceivedMessagesHandler, ReadMessageHandler, GetMessagesHandler} = require('./MessagesHandler');

MessagesController.post('/', isAuthenticated, SendMessageHandler);

MessagesController.get('/unread-count', isAuthenticated, UnreadCountHandler);

MessagesController.get('/sent', isAuthenticated, SentMessagesHandler);

MessagesController.get('/received', isAuthenticated, ReceivedMessagesHandler);

MessagesController.get('/:message', isAuthenticated, verifyId('message'), GetMessagesHandler);

MessagesController.post('/:message/set-read', isAuthenticated, verifyId('message'), ReadMessageHandler);

module.exports = MessagesController;
