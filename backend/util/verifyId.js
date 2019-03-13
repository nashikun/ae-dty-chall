const ObjectId = require("mongoose").Types.ObjectId;

const verifyId = function (param) {
  return function (req, res, next) {
    const Id = req.params[param];
    console.log(req.params);
    if (Id.match(/^[0-9a-fA-F]{24}$/) && Id === ObjectId(Id).toString()) {
      next()
    } else {
      res.status(404).end()
    }
  }
};

module.exports = verifyId;
