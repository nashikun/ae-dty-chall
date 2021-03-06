const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const emailvalidator = require('../../util/email-validator');

const LoginUserHandler = (req, res, next) => {
  return (err, user, reason) => {
    if (err) {
      console.error(err);
      return res.status(500).end();
    }
    if (user) {
      req.user = user;
      return next(null, user);
    } else {
      const reasons = mongoose.model('user').failedLogin;
      switch (reason.reason) {
        case reasons.NOT_FOUND:
        case reasons.PASSWORD_INCORRECT:
          return res.status(401).json({WRONG_CREDITENTIALS: true});
        case reasons.MAX_ATTEMPTS:
          //TODO send an email to the user
          return res.status(400).json({MAX_ATTEMPTS: true});
        default:
          return res.status(400).json(reason);
      }
    }
  }
};

const CreateUserHandle = (req, res) => {
  emailvalidator.createTempUser(req.body, (err, reasons, user) => {
    if (err) {
      console.error(err);
      return res.status(500).end();
    }
    if (reasons) {
      if (reasons.otherMethod) {
        //if the user alrady uses a new method, add a password andlog him in
        return mongoose.model('user').findOne({email: req.body.email}, async (err, user) => {
          if (err) {
            console.error(err);
            return res.status(500).end();
          }
          user.password = req.body.password;
          await user.save();
          const token = jwt.sign({id: user.id, role: user.role}, process.env.JWT_PWD);
          return res.status(200).send({id: user.id, role: user.role, token: token, verified: true})
        });
      }
      return res.status(400).end();
    }
    emailvalidator.sendVerificationEmail(user, function (err, info) {
      if (err) {
        console.error(err);
        return res.status(500).end();
      }
      return res.status(201).json({success: true});
    });
  });
};

const VerifyUserHandler = (req, res) => {
  const URL = req.params.url;
  mongoose.model('user').findOne({verificationURL: URL, verified: false}, async (err, user) => {
      if (err) {
        console.error(err);
        return res.status(500).end();
      }
      if (!user) {
        return res.status(404).end();
      }
      emailvalidator.createProfile(user, (err, username) => {
        if (err) {
          console.error(err);
          return res.status(500).end();
        }
        const token = jwt.sign({id: user.id, role: user.role}, process.env.JWT_PWD);
        return res.status(200).send({id: user.id, role: user.role, token: token, username: username})
      })
    }
  )
};

const LogoutHandler = (req, res) => {
  req.logout();
  res.end()
};


module.exports = {LoginUserHandler, CreateUserHandle, VerifyUserHandler, LogoutHandler};
