const mongoose = require('mongoose');
const async = require('async');
const emailvalidator = require('../../util/email-validator');

const generateUsername = async function (username) {
    const user = await mongoose.model('profile').findOne({username: username}).catch(err => {
        console.error(err);
        throw err
    });
    if (user) {
        username += Math.floor(Math.random() * 100 + 1);
        return generateUsername(username);
    }
    return username
};

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
    emailvalidator.createTempUser(req.body, (err, reasons, newTempUser) => {
        if (err) {
            console.error(err);
            return res.status(500).end();
        }
        if (reasons) {
            return res.status(400).json(reasons);
        }
        emailvalidator.sendVerificationEmail(newTempUser, function (err, info) {
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
            const list = new mongoose.model('list')();
            const profile = new mongoose.model('profile')();
            const username = await generateUsername('user');
            list.user = user._id;
            profile.user = user._id;
            profile.username = username;
            console.log(username);
            await async.parallel([list.save, profile.save]).catch(err => {
                console.error(err);
                return res.status(500).end();
            });
            user.verified = true;
            user.verificationURL = undefined;
            user.list = list._id;
            user.profile = profile._id;
            user.save().then(() => res.redirect(process.env.FRONTEND + `/verified?username=${username}`));
        }
    )
};

const LogoutHandler = (req, res) => {
    req.logout();
    res.end()
};


module.exports = {LoginUserHandler, CreateUserHandle, VerifyUserHandler, LogoutHandler};
