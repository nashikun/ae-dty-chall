const {AddFriendsHandler, AddUsernameHandler, ChangeUsernameHandler, GetFriendRequestsHandler, GetUsernameHandler} = require('./ProfileHandlers');


const ProfileController = require('express').Router({mergeParams: true});
const MessagesController = require('./MessagesController');
const passport = require('passport');
const verifyImage = require('../../../util/verifyImage');
const verifyId = require('../../../util/verifyId');

const {GetProfileHandler, UpdateBioHandler, UploadProfilePictureHndler} = require('./ProfileHandlers');

const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', '..', '..', 'images', 'profiles'));
    }, filename: (req, file, cb) => {
        const name = file.originalname.split('.').slice(0, -1).join('')
            .replace(/[ ]/g, '-').replace(/[^0-9a-z-]/gi, '');
        // Enleve l'extension, remplace les espaces par des tirets, et   enleve les characteres non alphanumeriques autres que -
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + ext);
    }
});
const MIME_TYPE_MAP = {
    "image/png": ".png",
    "image/jpeg": ".jpeg",
    "image/jpg": ".jpg"
};

ProfileController.get('/', async (req, res, next) => {
    if (!req.headers.authorization || req.headers.authorization.split(' ')[1] === 'null') {
        req.user = {_id: null};
        next();
    } else {
        passport.authenticate('jwt', {session: false})(req, res, next)
    }
}, GetProfileHandler);

ProfileController.put('/bio', passport.authenticate('jwt', {session: false}), UpdateBioHandler);

ProfileController.put('/picture', passport.authenticate('jwt', {session: false}), multer({storage: storage}).single('picture'), verifyImage, UploadProfilePictureHndler);

ProfileController.get('/username', verifyId('user'), GetUsernameHandler);

ProfileController.post('/username', verifyId('user'), AddUsernameHandler);

ProfileController.put('/username', passport.authenticate('jwt', {session: false}), ChangeUsernameHandler);

ProfileController.post('/friends', passport.authenticate('jwt', {session: false}), AddFriendsHandler);

ProfileController.get('/friends/requested', passport.authenticate('jwt', {session: false}), GetFriendRequestsHandler);

ProfileController.use('/messages', MessagesController);

module.exports = ProfileController;
