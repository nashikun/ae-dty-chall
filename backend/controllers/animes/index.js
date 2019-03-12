const AnimesController = require('express').Router();
const multer = require('multer');
const path = require('path');

const MODELS = '../../models/';
const Anime = require(MODELS + 'anime');
const Reviews = require(MODELS + 'review');
const Rating = require(MODELS + 'rating');

const passport = require('passport');
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
    if (!req.headers.authorization || req.headers.authorization.split(' ')[1] === 'null') {
        GuestAnimesHandler(req, res)
    } else {
        passport.authenticate('jwt', {session: false})(req, res, next)
    }
}, UserAnimesHandler);

AnimesController.post('/', passport.authenticate('jwt', {session: false}), verifyId('review'), (req, res, next) => {
    if (req.user.role === 'admin') next();
    else res.status(401).end()
}, multer({storage: storage}).single('image'), verifyImage, PostAnimeHandler);

AnimesController.head('/:animename', AnimeExistsHandler);

AnimesController.get('/latest', GetLatestAnimesHandler);

AnimesController.get('/:anime', verifyId('anime'), async (req, res, next) => {
    if (!req.headers.authorization || req.headers.authorization.split(' ')[1] === 'null') {
        GetGuestAnimeHandler(req, res)
    } else {
        passport.authenticate('jwt', {session: false})(req, res, next);
    }
}, GetUserAnimeHandler);

AnimesController.use('/:anime/ratings', verifyId('anime'), RatingsController);

AnimesController.use('/:anime/reviews', verifyId('anime'), ReviewsController);

module.exports = AnimesController;

