const verifyUser = require('../../../middleware/verifyUser');
const verifyId = require('../../../middleware/verifyId');

const ListController = require('express').Router({mergeParams: true});
const {GetListHandler, AddListAnimeHandler, ChangeListAnime} = require('./ListHandlers');

ListController.get('/', verifyId('user'), GetListHandler);

ListController.post('/', verifyUser, verifyId('user'), AddListAnimeHandler);

ListController.put('/:anime', verifyUser, verifyId('user'), verifyId('anime'), ChangeListAnime);

module.exports = ListController;

