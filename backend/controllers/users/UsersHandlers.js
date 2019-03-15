const mongoose = require("mongoose");
const cachegoose = require('cachegoose');
const async = require('async');
const ObjectId = mongoose.Types.ObjectId;

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
      return res.status(500).end()
    }
    return res.status(200).json({users: result[0], count: result[1].length})
  })
};

//TODO make sure it works as expected
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
      mongoose.model('review').deleteMany({reviewerId: ObjectId(req.params.user)}, cb)
    }
  ], (err, result) => {
    cachegoose.clearCache(req.params.user + '-profile');
    if (err) {
      console.error(err);
      return res.status(500).end()
    }
    res.status(200).end();
  })
};

const EmailExistsHandler = (req, res) => {
  // ifban email doesn't have a password, the user should be able to register (to add a password login method)
  mongoose.model('user').findOne({email: req.params.email, password: {$exists: true}}, (err, user) => {
    if (err) {
      console.error(err);
      return res.status(500).end();
    }
    if (!user) return res.status(404).end();
    return res.status(204).end();
  })
};

module.exports = {
  GetUsersHandle,
  BanUserHandler,
  EmailExistsHandler
};

