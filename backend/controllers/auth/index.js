const AuthController = require('express').Router({mergeParams: true});

const {LoginUserHandler, CreateUserHandle, VerifyUserHandler, LogoutHandler} = require('./AuthHandlers');

const passport = require('passport');
const jwt = require('jsonwebtoken');


const attachToken = function (req, res) {
  const token = jwt.sign({id: req.user.id, role: req.user.role}, process.env.JWT_PWD);
  res.header('Access-Control-Expose-Headers', 'x-auth-token');
  res.setHeader('x-auth-token', token);
  let response = {id: req.user.id, role: req.user.role, token: token};
  if (req.username) {
    response['username'] = req.username;
  }
  res.status(200).send(response);
};

AuthController.post('/login', function (req, res, next) {
  passport.authenticate('local', {
    session: false,
    failureFlash: false
  }, function (err, user, info) {
    LoginUserHandler(req, res, next)(err, user, info);
  },)(req, res, next)
}, attachToken);

AuthController.post('/signup', CreateUserHandle);

AuthController.post('/verify/:url', VerifyUserHandler);

AuthController.post('/facebook/token', function (req, res, next) {
  passport.authenticate('facebook-token', {}, function (err, user, username) {
    if (err) {
      console.error(err);
      return res.status(500).end()
    }
    if (!user) return res.status(401).end();
    req.user = user;
    req.username = username;
    next();
  })(req, res, next)
}, attachToken);

AuthController.post('/google/token', function (req, res, next) {
  passport.authenticate('google-token', {}, function (err, user, username) {
    if (err) {
      console.error(err);
      return res.status(500).end()
    }
    if (!user) return res.status(401).end();
    req.user = user;
    req.username = username;
    next();
  })(req, res, next)
}, attachToken);

AuthController.post('/logout', LogoutHandler);


module.exports = AuthController;
