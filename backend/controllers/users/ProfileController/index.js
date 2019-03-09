const {AddFriendsHandler, AddUsernameHandler, ChangeUsernameHandler, GetFriendRequestsHandler, GetUsernameHandler} = require('./ProfileHandlers');


const ProfileController = require('express').Router({mergeParams: true});
const MessagesController = require('./MessagesController');
const verifyUser = require('../../../middleware/verifyUser');
const verifyImage = require('../../../middleware/verifyImage');

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
        req.userId = null;
        next();
    } else {
        verifyUser(req, res, next)
    }
}, GetProfileHandler);

ProfileController.put('/bio', verifyUser, UpdateBioHandler);

ProfileController.put('/picture', verifyUser, multer({storage: storage}).single('picture'), verifyImage, UploadProfilePictureHndler);

ProfileController.get('/username', verifyId('user'), GetUsernameHandler);

ProfileController.post('/username', verifyId('user'), AddUsernameHandler);

ProfileController.put('/username', verifyUser, ChangeUsernameHandler);

ProfileController.post('/friends', verifyUser, AddFriendsHandler);

ProfileController.get('/friends/requested', verifyUser, GetFriendRequestsHandler);

ProfileController.use('/messages', MessagesController);

module.exports = ProfileController;
