const verifyUser = require('../../../middleware/verifyUser');
const verifyId = require('../../../middleware/verifyId');

const ListController = require('express').Router({mergeParams: true});
const {GetListHandler, AddListAnimeHandler, ChangeListAnime} = require('./ListHandlers');

ListController.get('/', verifyUser, GetListHandler);

ListController.post('/', verifyUser, AddListAnimeHandler);

ListController.put('/:anime', verifyId('anime'), verifyUser, ChangeListAnime);

module.exports = ListController;

