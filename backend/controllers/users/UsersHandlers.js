const mongoose = require("mongoose");
const emailvalidator = require('../../middleware/email-validator');
const jwt = require("jsonwebtoken");

const CreateUserHandle = (req, res) => {
  emailvalidator.createTempUser(req.body, (err, reasons, newTempUser) => {
    if (err) {
      console.error(err);
      res.status(500).end();
    } else {
      if (reasons) {
        res.status(400).send(reasons);
      } else {
        emailvalidator.sendVerificationEmail(newTempUser, function (err, info) {
          if (err) {
            console.error(err);
            res.status(500).end();
          }
          res.status(201).send({success: true});
        });
      }
    }
  });
};

const LoginUserHandler = (req, res) => {
  mongoose.model('user').getAuthenticated(req.body.email, req.body.password, (err, user, reason) => {
    if (err) {
      console.error(err);
      res.status(500).end();
    } else {
      if (user) {
        let payload = {subject: user._id, role: user.role};
        let token = jwt.sign(payload, 'anassino');
        res.status(201).send({
          token: token,
          username: user.username,
          role: user.role,
          picture: user.picture,
          id: user.id
        });
      }
      const reasons = mongoose.model('user').failedLogin;
      switch (reason) {
        case reasons.NOT_FOUND:
        case reasons.PASSWORD_INCORRECT:
          res.status(401).send({WRONG_CREDITENTIALS: true});
          break;
        case reasons.MAX_ATTEMPTS:
          //TODO send an email to the user
          res.status(400).send({MAX_ATTEMPTS: true});
          break;
      }
    }
  })
};

const VerifyUserHandler = (req, res) => {
  const URL = req.params.URL;
  mongoose.model('user').findOne({verificationURL: URL, verified: false}, async (err, user) => {
      if (err) {
        console.error(err);
        res.status(500).end();
      } else {
        if (!user) {
          res.status(404).end();
        } else {
          res.status(200).send({id: user._id});
        }
      }
    }
  )
};

module.exports = {CreateUserHandle, LoginUserHandler, VerifyUserHandler};

