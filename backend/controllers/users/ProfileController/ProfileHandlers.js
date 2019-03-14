const mongoose = require('mongoose');
const cachegoose = require('cachegoose');
const ObjectId = mongoose.Types.ObjectId;
const path = require('path');
const fs = require('fs');

const GetProfileHandler = async (req, res) => {
    const user = ObjectId(req.params.user);
    const profile = await mongoose.model('profile').findOne({user: user})
        .lean()
        .cache(0, req.params.user + '-profile')
        .catch(err => {
            console.error(err);
            res.status(500).end()
        });
    if (!profile) {
        res.status(404).end()
    } else {
        if (req.user._id && !req.user._id.equals(profile.user)) {
            mongoose.model('profile').getFriends(req.user._id, {user: profile.user}, {user: 1}, (err, friendship) => {
                if (err) {
                    console.error(err);
                    res.status(500).end()
                } else {
                    if (friendship.length) {
                        profile.friendship = friendship[0].status;
                    }
                    res.status(200).json(profile)
                }
            })
        } else {
            if (req.user._id) {
                profile.me = true;
            }
            res.status(200).json(profile)
        }
    }
};

const UpdateBioHandler = async (req, res) => {
    if (!req.user._id.equals(req.params.user)) {
        return res.status(401).end();
    }
    const updatedProfile = await mongoose.model('profile').updateOne({user: req.user._id}, req.body).catch(err => {
        console.error(err);
        return res.status(500).end()
    });
    cachegoose.clearCache(req.user._id + '-profile');
    if (updatedProfile.n) {
        return res.status(200).json(req.body);
    }
    return res.status(404).end();

};

const UploadProfilePictureHndler = async (req, res) => {
    if (!req.user._id.equals(req.params.user)) {
        res.status(401).end();
    } else {
        const picture = 'https://' + req.get('Host') + '/images/profiles/' + req.file.filename;
        const profile = await mongoose.model('profile').findOneAndUpdate({user: ObjectId(req.params.user)}, {picture: picture}).catch(err => {
            console.error(err);
            return res.status(500).end()
        });
        cachegoose.clearCache(req.user._id + '-profile');
        const oldImage = new URL(profile.picture).pathname;
        const oldImageArray = oldImage.split('/');
        if (oldImageArray[oldImageArray.length - 1] !== 'default.jpg') {
            return fs.unlink(path.join(__dirname, '..', '..', '..', oldImage), err => {
                if (err) {
                    console.error(err);
                    return res.status(500).end()
                }
                if (profile) {
                    return res.status(204).end();
                }
                return res.status(404).end()
            })
        }
        if (profile) {
            return res.status(204).end()
        }
        return res.status(404).end()
    }
};

const GetUsernameHandler = async (req, res) => {
    const user = await mongoose.model('profile').findOne({user: ObjectId(req.params.user)}).catch(err => {
        console.error(err);
        res.status(500).end()
    });
    if (!user) {
        return res.status(404).end();
    }
    return res.status(200).json({username: user.username});
};

const ChangeUsernameHandler = async (req, res) => {
    if (!req.user._id.equals(req.params.user)) {
        return res.status(401).end();
    }
    const usernameExists = await mongoose.model('profile').findOne({username: req.body.username}).catch(err => {
        console.error(err);
        res.status(500).end()
    });
    if (usernameExists && !usernameExists.user.equals(req.user._id)) {
        return res.status(400).json({usernameExists: true})
    }
    const profile = await mongoose.model('profile').updateOne({user: req.user._id}, {username: req.body.username}).catch(err => {
        console.error(err);
        res.status(500).end()
    });
    cachegoose.clearCache(req.user._id + '-profile');
    if (profile.n) {
        return res.status(204).end()
    }
    return res.status(404).end();
};

const AddFriendsHandler = (req, res) => {
    if (req.user._id.toString() === req.body.friend) {
        return res.status(400).end();
    }
    mongoose.model('profile').requestFriend(req.user._id, req.body.friend, (err, result) => {
        return res.status(201).json(result);
    });
};

const GetFriendRequestsHandler = (req, res) => {
    if (req.user._id.toString() === req.params.user) {
        return mongoose.model('profile').getPendingFriends(req.user._id, (err, friends) => {
            if (err) {
                console.error(err);
                return res.status(500).end()
            }
            return res.status(200).json(friends)
        })
    }
    return res.status(401).end();
};

module.exports = {
    GetProfileHandler,
    UpdateBioHandler,
    UploadProfilePictureHndler,
    GetUsernameHandler,
    ChangeUsernameHandler,
    AddFriendsHandler,
    GetFriendRequestsHandler
};
