const jwt = require('jsonwebtoken');

function verifyAdmin(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send('Unauthorized Request');
  }
  const token = req.headers.authorization.split(' ')[1];
  if (token == null) {
    return res.status(401).send('Unauthorized Request');
  }
  try {
    const payload = jwt.verify(token, 'anassino');
    if (payload.role === 'admin') {
      next();
    }
    else{
      return res.status(401).send('Unauthorized Request');
    }
  } catch (err) {
    return res.status(401).send('Unauthorized Request');
  }
}

module.exports = verifyAdmin;
