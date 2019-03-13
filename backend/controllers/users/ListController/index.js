const isAuthenticated = require('../../../util/isAuthenticated');
const verifyId = require('../../../util/verifyId');

const ListController = require('express').Router({mergeParams: true});
const {GetListHandler, AddListAnimeHandler, ChangeListAnime} = require('./ListHandlers');

ListController.get('/', verifyId('user'), GetListHandler);

ListController.post('/', isAuthenticated, AddListAnimeHandler);

ListController.put('/:anime', isAuthenticated, verifyId('anime'), ChangeListAnime);

module.exports = ListController;

