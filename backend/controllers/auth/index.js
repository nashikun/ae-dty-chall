const AuthController = require('express').Router({mergeParams: true});

const {LoginUserHandler, LogoutHandler} = require('./AuthHandlers');

const passport = require('passport');

AuthController.get('/login', function (req, res) {
    res.send({user: req.user});
});

AuthController.post('/login', function (req, res) {
    passport.authenticate('local', {
        session: true,
        failureRedirect: '/login',
        failureFlash: false
    }, function (err, user, info) {
        LoginUserHandler(req, res)(err, user, info);
    },)(req, res)
});

AuthController.post('/logout', LogoutHandler);

AuthController.get('/facebook', passport.authenticate('facebook'));

AuthController.get('/facebook/callback',
    passport.authenticate('facebook', {failureRedirect: '/login'}),
    function (req, res) {
        res.redirect(process.env.FRONTEND + `/redirect?id=${req.user._id}&role=${req.user.role}`);
    });

module.exports = AuthController;
