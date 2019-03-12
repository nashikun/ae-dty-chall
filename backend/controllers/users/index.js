const UserController = require('express').Router({mergeParams: true});
const mongoose = require('mongoose');
const passport = require('passport');
const ProfileController = require('./ProfileController');
const ListController = require('./ListController');
const {CreateUserHandle, GetUsersHandle, LoginUserHandler, VerifyUserHandler, BanUserHandler} = require('./UsersHandlers');

const verifyAdmin = require('../../util/verifyAdmin');

UserController.post('/', CreateUserHandle);

UserController.get('/', GetUsersHandle);

UserController.post('/login', (req, res) => {
    passport.authenticate('local', {session: false}, LoginUserHandler(req, res))(req, res)
});

UserController.get('/verify/:URL', VerifyUserHandler);

UserController.post('/:user/ban', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    if (res.user.role === 'admin') next();
    else res.status(401).end();
}, BanUserHandler);

UserController.use('/:user/profile', ProfileController);

UserController.use('/:user/list', ListController);

UserController.head('/emails/:email', (req, res) => {
    mongoose.model('user').findOne({email: req.params.email}, (err, user) => {
        if (err) {
            console.error(err);
            res.status(500).end();
        }
        if (!user) res.status(404).end();
        else res.status(204).end();
    })
});

module.exports = UserController;
