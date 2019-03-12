const async = require('async');
const mongoose = require('mongoose');
const cachegoose = require('cachegoose');
const ObjectId = mongoose.Types.ObjectId;

const SendMessageHandler = async (req, res) => {
    const message = await mongoose.model('message').create({
        senderId: req.user._id,
        title: req.body.title,
        recipientId: req.params.user,
        message: req.body.message
    }).catch(err => {
        console.error(err);
        res.status(500).end()
    });
    cachegoose.clearCache(req.user._id + '-unreadmail');
    if (!message) {
        res.status(400).end()
    } else {
        res.status(204).end()
    }
};

const UnreadCountHandler = async (req, res) => {
    if (req.user._id.toString() === req.params.user) {
        const unread = await mongoose.model('message').find({
            recipientId: ObjectId(req.params.user),
            read: false
        }).cache(0, req.params.user + '-unreadmail').catch(err => {
            console.error(err);
            res.status(500).end();
        });
        const count = unread.length;
        res.status(200).json({count: count});
    } else {
        res.status(401).end();
    }
};

const SentMessagesHandler = async (req, res) => {
    if (req.user._id.toString() === req.params.user) {
        const limit = +req.query.size;
        const skip = req.query.page * limit;
        const sent = function (cb) {
            mongoose.model('message')
                .find({senderId: req.user._id})
                .sort({createdAt: -1})
                .skip(skip)
                .limit(limit)
                .select('-read')
                .populate({path: 'recipient', select: 'username'})
                .exec((err, results) => {
                    if (err) {
                        console.error(err);
                        res.status(500).end()
                    } else {
                        cb(null, results)
                    }
                });
        };
        const count = function (cb) {
            mongoose.model('message').find({senderId: req.user._id}, {}).exec((err, results) => {
                if (err) {
                    console.error(err);
                    res.status(500).end()
                } else {
                    cb(null, results.length)
                }
            });
        };
        async.parallel([sent, count], (err, results) => {
            if (err) {
                res.status(500).end();
            } else {
                res.status(200).json({sent: results[0], sentCount: results[1]});
            }
        });
    } else {
        res.status(401).end();
    }
};

const ReceivedMessagesHandler = async (req, res) => {
    if (req.user._id.toString() === req.params.user) {
        const limit = +req.query.size;
        const skip = req.query.page * limit;
        const sent = function (cb) {
            mongoose.model('message')
                .find({recipientId: req.user._id})
                .sort({createdAt: -1})
                .skip(skip)
                .limit(limit)
                .populate({path: 'sender', select: 'username'})
                .exec((err, results) => {
                    if (err) {
                        console.error(err);
                        res.status(500).end()
                    } else {
                        cb(null, results)
                    }
                });
        };
        const count = function (cb) {
            mongoose.model('message').find({recipientId: req.user._id}, {}).exec((err, results) => {
                if (err) {
                    console.error(err);
                    res.status(500).end()
                } else {
                    cb(null, results.length)
                }
            });
        };
        async.parallel([sent, count], (err, results) => {
            if (err) {
                res.status(500).end();
            } else {
                res.status(200).json({received: results[0], receivedCount: results[1]});
            }
        });
    } else {
        res.status(401).end();
    }
};

const GetMessagesHandler = async (req, res) => {
    const message = await mongoose.model('message')
        .findById(req.params.message)
        .populate({path: 'sender', select: 'username'})
        .populate({path: 'recipient', select: 'username'})
        .catch(err => {
            console.error(err);
            res.status(500).end();
        });
    if (!message) {
        res.status(404).end();
    } else {
        if (!(message.senderId.equals(req.user._id) || message.recipientId.equals(req.user._id))) {
            res.status(401).end();
        } else {
            res.status(200).json(message);
        }
    }
};

const ReadMessageHandler = async (req, res) => {
    const message = await mongoose.model('message').findById(req.params.message).catch(err => {
        console.error(err);
        res.status(500).end();
    });
    if (!message) {
        res.status(404).end();
    } else {
        if (!message.recipientId.equals(req.user._id)) {
            res.status(401).end();
        } else {
            message.read = true;
            const update = await message.save().catch(err => {
                console.error(err);
                res.status(500).end();
            });
            cachegoose.clearCache(req.user._id + '-unreadmail');
            if (update.read) {
                res.status(204).end();
            } else {
                res.status(400).end();
            }
        }
    }

};

module.exports = {
    SendMessageHandler,
    UnreadCountHandler,
    SentMessagesHandler,
    ReceivedMessagesHandler,
    GetMessagesHandler,
    ReadMessageHandler
};
