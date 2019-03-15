const UserController = require('express').Router({mergeParams: true});
const isAuthenticated = require('../../util/isAuthenticated');
const ProfileController = require('./ProfileController');
const ListController = require('./ListController');
const {GetUsersHandle, BanUserHandler, EmailExistsHandler} = require('./UsersHandlers');


UserController.get('/', GetUsersHandle);

UserController.post('/:user/ban', isAuthenticated, (req, res, next) => {
  if (req.user.role === 'admin') next();
  else res.status(401).end();
}, BanUserHandler);

UserController.use('/:user/profile', ProfileController);

UserController.use('/:user/list', ListController);

UserController.head('/emails/:email', EmailExistsHandler);

module.exports = UserController;
