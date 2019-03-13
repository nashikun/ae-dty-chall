const UserController = require('express').Router({mergeParams: true});
const isAuthenticated = require('../../util/isAuthenticated');
const ProfileController = require('./ProfileController');
const ListController = require('./ListController');
const {CreateUserHandle, GetUsersHandle, VerifyUserHandler, BanUserHandler, EmailExistsHandler} = require('./UsersHandlers');

UserController.post('/', CreateUserHandle);

UserController.get('/', GetUsersHandle);

UserController.get('/verify/:URL', VerifyUserHandler);

UserController.post('/:user/ban', isAuthenticated, (req, res, next) => {
    if (req.user.role === 'admin') next();
    else res.status(401).end();
}, BanUserHandler);

UserController.use('/:user/profile', ProfileController);

UserController.use('/:user/list', ListController);

UserController.head('/emails/:email', EmailExistsHandler);

module.exports = UserController;
