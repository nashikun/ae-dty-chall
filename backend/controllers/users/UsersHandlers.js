const mongoose = require("mongoose");
const cachegoose = require('cachegoose');
const emailvalidator = require('../../util/email-validator');
const async = require('async');
const ObjectId = mongoose.Types.ObjectId;

const CreateUserHandle = (req, res) => {
    emailvalidator.createTempUser(req.body, (err, reasons, newTempUser) => {
        if (err) {
            console.error(err);
            res.status(500).end();
        } else {
            if (reasons) {
                res.status(400).json(reasons);
            } else {
                emailvalidator.sendVerificationEmail(newTempUser, function (err, info) {
                    if (err) {
                        console.error(err);
                        res.status(500).end();
                    } else {
                        res.status(201).json({success: true});
                    }
                });
            }
        }
    });
};

const GetUsersHandle = async (req, res) => {
    const limit = +req.query.size || 5;
    const skip = limit * req.query.page || 0;
    let sort = {};
    switch (req.query.order) {
        default:
        case 'asc':
            sort[req.query.sort] = 1;
            break;
        case 'desc':
            sort[req.query.sort] = -1;
            break;
    }
    async.parallel([
        cb => {
            mongoose
                .model('profile')
                .find({username: {$regex: req.query.search || "", $options: 'i'}})
                .sort(sort)
                .skip(skip)
                .limit(limit)
                .select('user username picture createdAt')
                .exec(cb)
        },
        cb => {
            mongoose
                .model('profile')
                .find({}, cb)
        }
    ], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).end()
        } else {
            res.status(200).json({users: result[0], count: result[1].length})
        }
    })
};

const ChangePasswordHandler = function (req, res) {

};

const VerifyUserHandler = (req, res) => {
    const URL = req.params.URL;
    mongoose.model('user').findOne({verificationURL: URL, verified: false}, (err, user) => {
            if (err) {
                console.error(err);
                res.status(500).end();
            } else {
                if (!user) {
                    res.status(404).end();
                } else {
                    res.status(200).json({id: user._id});
                }
            }
        }
    )
};

const BanUserHandler = async (req, res) => {
    await async.parallel([
        (cb) => {
            mongoose.model('user').updateOne({_id: ObjectId(req.params.user)}, {
                $unset: {role: 1, list: 1, profile: 1},
                banned: true
            }, cb)
        },
        (cb) => {
            mongoose.model('profile').deleteMany({user: ObjectId(req.params.user)}, cb)
        },
        (cb) => {
            mongoose.model('list').deleteMany({user: ObjectId(req.params.user)}, cb)
        },
        (cb) => {
            mongoose.model('review').deleteMany({user: ObjectId(req.params.user)}, cb)
        }
    ], (err, result) => {
        cachegoose.clearCache(req.params.user + '-profile');
        if (err) {
            console.error(err);
            res.status(500).end()
        } else {
            res.status(200).end();
        }
    })
};

const EmailExistsHandler = (req, res) => {
    mongoose.model('user').findOne({email: req.params.email}, (err, user) => {
        if (err) {
            console.error(err);
            res.status(500).end();
        }
        if (!user) res.status(404).end();
        else res.status(204).end();
    })
}

module.exports = {
    CreateUserHandle,
    GetUsersHandle,
    VerifyUserHandler,
    BanUserHandler,
    EmailExistsHandler
};

