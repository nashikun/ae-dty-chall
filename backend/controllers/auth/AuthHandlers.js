const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const LoginUserHandler = (req, res) => {
    return (err, user, reason) => {
        if (err) {
            console.error(err);
            return res.status(500).end();
        }
        if (user) {
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

const LogoutHandler = (req, res) => {
    req.logout();
    res.end()
};


module.exports = {LoginUserHandler, LogoutHandler};
