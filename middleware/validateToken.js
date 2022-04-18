const jwt = require('jsonwebtoken');

function validateToken(req, res, next) {
  let { token } = req.headers;

  if (token) {
    try {
      req.tokenPayload = jwt.verify(token, process.env.JWT_SECRET);
      next();
    } catch {
      res.status(401).json({ message: 'Invalid token provided' });
    }
  } else {
    res.status(404).json({ message: 'Missing required token header' });
  }
}

module.exports = validateToken;