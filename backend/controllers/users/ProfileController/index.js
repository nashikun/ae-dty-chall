const {
    AddFriendsHandler, ChangeUsernameHandler, GetFriendRequestsHandler, GetUsernameHandler,
    GetProfileHandler, UpdateBioHandler, UploadProfilePictureHandler
} = require('./ProfileHandlers');
const isAuthenticated = require('../../../util/isAuthenticated');

const ProfileController = require('express').Router({mergeParams: true});
const MessagesController = require('./MessagesController');
const verifyImage = require('../../../util/verifyImage');
const verifyId = require('../../../util/verifyId');
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
    if (req.cookies) {
        isAuthenticated(req, res, next)
    } else {
        req.user = {_id: null};
        next();
    }
}, GetProfileHandler);

ProfileController.put('/bio', isAuthenticated, UpdateBioHandler);

ProfileController.put('/picture', isAuthenticated, multer({storage: storage}).single('picture'), verifyImage, UploadProfilePictureHandler);

ProfileController.get('/username', verifyId('user'), GetUsernameHandler);

ProfileController.put('/username', isAuthenticated, ChangeUsernameHandler);

ProfileController.post('/friends', isAuthenticated, AddFriendsHandler);

ProfileController.get('/friends/requested', isAuthenticated, GetFriendRequestsHandler);

ProfileController.use('/messages', MessagesController);

module.exports = ProfileController;
