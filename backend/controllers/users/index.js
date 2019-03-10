const UserController = require('express').Router({mergeParams: true});
const ProfileController = require('./ProfileController');
const ListController = require('./ListController');
const {CreateUserHandle, GetUsersHandle, LoginUserHandler, VerifyUserHandler, BanUserHandler} = require('./UsersHandlers');

const verifyAdmin = require('../../util/verifyAdmin');

const models = '../../models/';
const User = require(models + 'user');
const List = require(models + 'list');
const Profile = require(models + 'profile');
const Message = require(models + 'message');

UserController.post('/', CreateUserHandle);

UserController.get('/', GetUsersHandle);

UserController.post('/login', LoginUserHandler);

UserController.get('/verify/:URL', VerifyUserHandler);

UserController.post('/:user/ban', verifyAdmin, BanUserHandler);

UserController.use('/:user/profile', ProfileController);

UserController.use('/:user/list', ListController);

UserController.head('/emails/:email', (req, res) => {
    User.findOne({email: req.params.email}, (err, user) => {
        if (err) {
            console.error(err);
            res.status(500).end();
        }
        if (!user) res.status(404).end();
        else res.status(204).end();
    })
});

module.exports = UserController;
