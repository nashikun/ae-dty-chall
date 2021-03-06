const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const STATUSES = ['Plan To Watch', 'Watched', 'Watching', 'Dropped', 'On Hold'];
const cachegoose = require('cachegoose');

const GetListHandler = async (req, res) => {
    const list = await mongoose.model('list')
        .aggregate([
            {$match: {user: ObjectId(req.params.user)}},
            {$unwind: '$animelist'},
            {$lookup: {from: 'animes', localField: 'animelist.anime', foreignField: '_id', as: 'animelist.anime'}},
            {
                $project: {
                    _id: 1,
                    'animelist.status': 1,
                    'animelist.anime._id': 1,
                    'animelist.anime.name': 1,
                    'animelist.anime.image': 1
                }
            },
            {$group: {_id: '$animelist.status', animelist: {$push: {$arrayElemAt: ["$animelist.anime", 0]}}}}])
        .cache(0, `${req.params.user}-list`)
        .catch(err => console.error(err));
    if (!list) {
        return res.status(404).end()
    }
    let formatedList = {};
    const n = list.length;
    for (let i = 0; i < n; i += 1) {
        formatedList[list[i]._id] = list[i].animelist;
    }
    res.status(200).json(formatedList);
};

const AddListAnimeHandler = async (req, res) => {
    if (req.user._id.toString() === req.params.user) {
        const anime = await mongoose.model('anime').findById(req.body.id).catch(err => {
            console.error(err);
            res.status(500).end()
        });
        if (!anime) {
            return res.status(404).end();
        }
        //couldn't put it in a hook because of: ref:  https://github.com/Automattic/mongoose/issues/964
        // should look for an alternative
        cachegoose.clearCache(req.user._id + '-list');
        const list = await mongoose.model('list').updateOne({
            'user': req.user._id, 'anime': {$ne: anime.id}
        }, {
            $addToSet: {
                animelist: {
                    'anime': anime.id,
                    'status': req.body.status,
                    'watchedEpisodes': req.body.watchedEpisodes
                }
            }
        });
        if (!list.n) {
            return res.status(400).end()
        }
        return res.status(204).end()
    }
    return res.status(401).end()
};

const ChangeListAnime = async (req, res) => {
    if (req.user._id.toString() === req.params.user) {
        const anime = await mongoose.model('anime').findById(req.params.anime).catch(err => {
            console.error(err);
            res.status(500).end();
        });
        if (!anime) {
            return res.status(404).end();
        }
        if ((!req.body.watchedEpisodes || (0 <= req.body.watchedEpisodes && req.body.watchedEpisodes <= anime.episodes && Number.isInteger(req.body.watchedEpisodes))) && STATUSES.includes(req.body.status)) {
            // either episodes aren't specified, or they are nd should verify the conditions
            cachegoose.clearCache(req.user._id + '-list');
            return mongoose.model('list').updateOne({
                'user': req.user._id,
                'animelist.anime': anime._id
            }, {
                $set: {
                    'animelist.$.status': req.body.status,
                    'animelist.$.watchedEpisodes': req.body.watchedEpisodes
                }
            }, {new: true})
                .then(result => {
                    if (result.n) {
                        return res.status(204).end();
                    }
                    return res.status(404).end();
                })
                .catch(err => {
                    console.error(err);
                    res.status(500).end()
                });
        }
        return res.status(422).json({invalid: true})
    }
    res.status(401).end()
};


module.exports = {GetListHandler, AddListAnimeHandler, ChangeListAnime};
