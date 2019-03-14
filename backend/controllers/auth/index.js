const AuthController = require('express').Router({mergeParams: true});

const {LoginUserHandler, LogoutHandler} = require('./AuthHandlers');

const passport = require('passport');
const jwt = require('jsonwebtoken');


const attachToken = function (req, res) {
    const token = jwt.sign({id: req.user.id, role: req.user.role}, process.env.JWT_PWD, {expiresIn: 60 * 120});
    res.header('Access-Control-Expose-Headers', 'x-auth-token');
    res.setHeader('x-auth-token', token);
    res.status(200).send({id: req.user.id, role: req.user.role, token: token});
};

AuthController.post('/login', function (req, res, next) {
    passport.authenticate('local', {
        session: false,
        failureFlash: false
    }, function (err, user, info) {
        LoginUserHandler(req, res, next)(err, user, info);
    },)(req, res, next)
}, attachToken);

AuthController.post('/facebook/token', passport.authenticate('facebook-token'), attachToken);

AuthController.post('/google/token', passport.authenticate('google-token'), attachToken);

AuthController.post('/logout', LogoutHandler);


module.exports = AuthController;
