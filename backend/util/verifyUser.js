const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");

function verifyUser(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send('Unauthorized Request');
  }
  const token = req.headers.authorization.split(' ')[1];
  if (token === 'null') {
    return res.status(401).send('Unauthorized Request');
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_PWD);
    req.userId = mongoose.Types.ObjectId(payload.subject);
    next();
  } catch (err) {
    return res.status(401).send('Unauthorized Request');
  }
}

module.exports = verifyUser;
