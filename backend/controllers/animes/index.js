const AnimesController = require('express').Router();
const multer = require('multer');
const path = require('path');
const isAuthenticated = require('../../util/isAuthenticated');

const MODELS = '../../models/';
const Anime = require(MODELS + 'anime');
const Reviews = require(MODELS + 'review');
const Rating = require(MODELS + 'rating');

const verifyImage = require('../../util/verifyImage');
const verifyId = require('../../util/verifyId');

const MIME_TYPE_MAP = {
    "image/png": ".png",
    "image/jpeg": ".jpeg",
    "image/jpg": ".jpg"
};
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', '..', 'images', 'animes'));
    }, filename: (req, file, cb) => {
        const name = file.originalname.replace(/[ ]/gi, '-').replace(/[^0-9a-z-]/gi, '');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + ext);
    }
});

const {GuestAnimesHandler, UserAnimesHandler, PostAnimeHandler, GetGuestAnimeHandler, AnimeExistsHandler, GetUserAnimeHandler, GetLatestAnimesHandler} = require('./AnimeHandlers');
const RatingsController = require('./ratings-controller');
const ReviewsController = require('./reviews-controller');

AnimesController.get('/', (req, res, next) => {
    if (req.cookies) {
        isAuthenticated(req, res, next)
    } else {
        GuestAnimesHandler(req, res)
    }
}, UserAnimesHandler);

AnimesController.post('/', isAuthenticated, (req, res, next) => {
    if (req.user.role === 'admin') next();
    else res.status(401).end()
}, multer({storage: storage}).single('image'), verifyImage, PostAnimeHandler);

AnimesController.head('/:animename', AnimeExistsHandler);

AnimesController.get('/latest', (req, res, next) => {
    next()
}, GetLatestAnimesHandler);

AnimesController.get('/:anime', verifyId('anime'), (req, res, next) => {
    if (req.cookies) {
        isAuthenticated(req, res, next)
    } else {
        GetGuestAnimeHandler(req, res);
    }
}, GetUserAnimeHandler);

AnimesController.use('/:anime/ratings', verifyId('anime'), RatingsController);

AnimesController.use('/:anime/reviews', verifyId('anime'), ReviewsController);

module.exports = AnimesController;

