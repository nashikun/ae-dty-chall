
const UserController = require('express').Router({mergeParams: true});
const ProfileController = require('./ProfileController');
const ListController = require('./ListController');
const {CreateUserHandle, LoginUserHandler, VerifyUserHandler, BanUserHandler} = require('./UsersHandlers');

const models = '../../models/';
const User = require(models + 'user');
const List = require(models + 'list');
const Profile = require(models + 'profile');
const Message = require(models + 'message');

const verifyId = require('../../middleware/verifyId');

UserController.post('/', CreateUserHandle);

UserController.post('/login', LoginUserHandler);

UserController.get('/verify/:URL', VerifyUserHandler);

UserController.use('/:user/profile', ProfileController);

UserController.use('/:user/list', ListController);

UserController.use('/:user/ban', ListController);

UserController.head('/usernames/:username', (req, res) => {
  User.findOne({username: req.params.username}, (err, user) => {
    if (err) {
      console.error(err);
      res.status(500).end();
    }
    if (!user) res.status(204).json({userExists: false});
    else res.status(204).json({userExists: true});
  })
});

module.exports = UserController;
