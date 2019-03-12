const MessagesController = require('express').Router({mergeParams: true});
const passport = require('passport');
const verifyId = require('../../../../util/verifyId');

const {SendMessageHandler, UnreadCountHandler, SentMessagesHandler, ReceivedMessagesHandler, ReadMessageHandler, GetMessagesHandler} = require('./MessagesHandler');

MessagesController.post('/', passport.authenticate('jwt', {session: false}), SendMessageHandler);

MessagesController.get('/unread-count', passport.authenticate('jwt', {session: false}), UnreadCountHandler);

MessagesController.get('/sent', passport.authenticate('jwt', {session: false}), SentMessagesHandler);

MessagesController.get('/received', passport.authenticate('jwt', {session: false}), ReceivedMessagesHandler);

MessagesController.get('/:message', passport.authenticate('jwt', {session: false}), verifyId('message'), GetMessagesHandler);

MessagesController.post('/:message/set-read', passport.authenticate('jwt', {session: false}), verifyId('message'), ReadMessageHandler);

module.exports = MessagesController;
