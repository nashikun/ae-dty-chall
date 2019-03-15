const mongoose = require('mongoose');
const cachegoose = require('cachegoose');
const ObjectId = mongoose.Types.ObjectId;

const GuestAnimesHandler = async (req, res) => {
    const limit = +req.query.size || 5;
    const skip = limit * req.query.page || 0;
    let sort = {};
    switch (req.query.order) {
        default:
        case 'asc':
            sort[req.query.sort || 'name'] = 1;
            break;
        case 'desc':
            sort[req.query.sort || 'name'] = -1;
            break;
    }
    const results = await mongoose.model('anime').aggregate([{
        $match: {name: {$regex: req.query.search || "", $options: 'i'}}
    }, {
        $lookup: {
            from: "ratings",
            let: {"id": "$_id"},
            pipeline: [{$match: {$expr: {$eq: ["$anime", "$$id"]}}}],
            as: "ratings"
        }
    }, {$addFields: {score: {$avg: "$ratings.rating"},}}, {
        $facet: {
            paginated_results: [{$sort: sort}, {$skip: skip}, {$limit: limit}, {
                $project: {
                    name: 1,
                    image: 1,
                    episodes: 1,
                    count: 1,
                    score: 1,
                    watchedEpisodes: {$arrayElemAt: ["$animedata.animelist.watchedEpisodes", 0]}
                }
            }],
            total: [{$count: 'count'}]
        }
    }]).catch(err => {
        console.error(err);
        res.status(500).end()
    });
    let count, animes;
    try {
        count = results[0].total[0].count;
        animes = results[0].paginated_results;
    } catch {
        count = 0;
        animes = [];
    }
    res.status(200).json({animes, count})
};

const UserAnimesHandler = async (req, res) => {
    const limit = +req.query.size || 10;
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
    const results = await mongoose.model('anime').aggregate([{
        $match: {name: {$regex: req.query.search || "", $options: 'i'}}
    }, {
        $lookup: {
            from: "ratings",
            let: {"id": "$_id"},
            pipeline: [{$match: {$expr: {$eq: ["$anime", "$$id"]}}}],
            as: "ratings"
        }
    }, {$addFields: {score: {$avg: "$ratings.rating"}}}, {
        $facet: {
            paginated_results: [{$sort: sort}, {$skip: skip}, {$limit: limit}, {
                $lookup: {
                    from: "lists",
                    let: {"id": "$_id"},
                    pipeline: [{$match: {$expr: {$eq: ["$user", req.user._id]}}}, {$unwind: "$animelist"}, {$match: {$expr: {$eq: ["$$id", "$animelist.anime"]}}}],
                    as: "animedata"
                }
            }, {
                $project: {
                    name: 1,
                    image: 1,
                    episodes: 1,
                    count: 1,
                    score: 1,
                    rating: {
                        $arrayElemAt: [{
                            $filter: {
                                input: "$ratings",
                                as: "rating",
                                cond: {$eq: ["$$rating.user", req.user._id]}
                            }
                        }, 0]
                    },
                    status: {$arrayElemAt: ["$animedata.animelist.status", 0]},
                    watchedEpisodes: {$arrayElemAt: ["$animedata.animelist.watchedEpisodes", 0]}
                }
            }], total: [{$count: 'count'}]
        }
    }]).catch(err => {
        console.error(err);
        res.status(500).end()
    });
    let count, animes;
    try {
        count = results[0].total[0].count;
        animes = results[0].paginated_results;
    } catch {
        count = 0;
        animes = [];
    }
    res.status(200).json({animes, count})
};

const PostAnimeHandler = (req, res) => {
    mongoose.model('anime').findById(req.params.anime, (err, result) => {
            if (err) {
                return res.status(500).end();
            } else {
                if (result) {
                    return res.status(400).end();
                }
                let anime = new mongoose.model('anime')(req.body);
                anime.image = 'https://' + req.get('Host') + '/images/animes/' + req.file.filename;
                anime.save((err, savedAnime) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).end();
                    }
                    cachegoose.clearCache('latest');
                    return res.status(200).json({id: savedAnime._id});
                })
            }
        }
    );
};

const GetGuestAnimeHandler = async (req, res) => {
    const anime = await mongoose.model('anime').findById(req.params.anime)
        .lean()
        .cache(0, req.params.anime + '-anime')
        .catch(err => {
            console.error(err);
            return res.status(500).end()
        });
    if (!anime) {
        return res.status(404).end();
    }
    const score = await mongoose.model('rating').aggregate([{$match: {anime: ObjectId(req.params.anime)}},
        {
            $group: {
                _id: null,
                score: {$avg: '$rating'},
            }
        }]).catch(err => {
        console.error(err);
        res.status(500).end()
    });
    if (score.length) {
        anime.score = score[0].score;
    } else {
        anime.score = 'N/A'
    }
    return res.status(200).json(anime);
};

const AnimeExistsHandler = async (req, res) => {
    const anime = await mongoose.model('anime').findOne({name: req.params.animename}).catch(err => {
        console.error(err);
        return res.status(500).end()
    });
    if (anime) return res.status(204).end();
    res.status(404).end();
};

const GetUserAnimeHandler = async (req, res) => {
    const animes = await mongoose.model('anime').aggregate([
        {$match: {_id: ObjectId(req.params.anime)}},
        {
            $lookup: {
                from: "lists",
                pipeline: [{$match: {$expr: {$eq: ["$user", req.user._id]}}}, {$unwind: "$animelist"}, {$match: {$expr: {$eq: ["$animelist.anime", ObjectId(req.params.anime)]}}},],
                as: "listdata"
            }
        },
        {
            $project: {
                name: 1,
                description: 1,
                rating: 1,
                image: 1,
                episodes: 1,
                scoredata: 1,
                status: {$arrayElemAt: ["$listdata.animelist.status", 0]},
                watchedEpisodes: {$arrayElemAt: ["$listdata.animelist.watchedEpisodes", 0]}
            }
        }
    ]);
    const anime = animes[0];
    if (!anime) {
        return res.status(404).end()
    }
    const result = await mongoose.model('rating').aggregate([{$match: {anime: ObjectId(req.params.anime)}}, {
        $facet: {
            score: [{
                $group: {
                    _id: null,
                    score: {$avg: '$rating'},
                }
            }], rating: [{$match: {'user': req.user._id}}]
        }
    }, {
        $project: {
            score: {$arrayElemAt: ['$score', 0]},
            rating: {$arrayElemAt: ['$rating', 0]}
        }
    }]).catch(err => {
        console.error(err);
        return res.status(500).end()
    });
    if (result[0].score) {
        anime.score = result[0].score.score;
        anime.rating = result[0].rating
    } else {
        anime.score = 'N/A';
        anime.rating = {};
    }
    res.status(200).json(anime)
};

const GetLatestAnimesHandler = async (req, res) => {
    const latest = await mongoose.model('anime').find({}).select({
        _id: 1,
        image: 1,
        name: 1
    }).sort({_id: -1}).limit(5).cache('latest').catch(err => {
        console.error(err);
        return res.status(500).end()
    });
    res.status(200).json(latest);
};

module.exports = {
    GuestAnimesHandler,
    UserAnimesHandler,
    PostAnimeHandler,
    GetGuestAnimeHandler,
    AnimeExistsHandler,
    GetUserAnimeHandler,
    GetLatestAnimesHandler
};
