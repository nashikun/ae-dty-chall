const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const LoginUserHandler = (req, res) => {
    return (err, user, reason) => {
        if (err) {
            console.error(err);
            res.status(500).end();
        } else {
            if (user) {
                //4let payload = {subject: user._id, role: user.role};
                //let token = jwt.sign(payload, process.env.JWT_PWD, {expiresIn: "1h"});
                req.logIn(user, function (err) {
                    res.status(201).json({
                        role: user.role,
                        id: user.id
                    });
                });
            } else {
                const reasons = mongoose.model('user').failedLogin;
                switch (reason.reason) {
                    case reasons.NOT_FOUND:
                    case reasons.PASSWORD_INCORRECT:
                        res.status(401).json({WRONG_CREDITENTIALS: true});
                        break;
                    case reasons.MAX_ATTEMPTS:
                        //TODO send an email to the user
                        res.status(400).json({MAX_ATTEMPTS: true});
                        break;
                    default:
                        res.status(400).json(reason);
                }
            }
        }
    }
};

const LogoutHandler = (req, res) => {
    req.logout();
    res.end()
};


module.exports = {LoginUserHandler, LogoutHandler};
