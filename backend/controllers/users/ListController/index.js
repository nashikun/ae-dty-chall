const passport = require('passport');
const verifyId = require('../../../util/verifyId');

const ListController = require('express').Router({mergeParams: true});
const {GetListHandler, AddListAnimeHandler, ChangeListAnime} = require('./ListHandlers');

ListController.get('/', verifyId('user'), GetListHandler);

ListController.post('/', passport.authenticate('jwt', {session: false}), AddListAnimeHandler);

ListController.put('/:anime', passport.authenticate('jwt', {session: false}), verifyId('anime'), ChangeListAnime);

module.exports = ListController;

