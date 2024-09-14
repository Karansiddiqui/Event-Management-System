
const jwt = require('jsonwebtoken'); // Use require instead of import
const errorHandler = require('./errorMiddleware.js'); // Also use require for your custom error handler

const authMiddleware = (req, res, next) => {
  const token = req.cookies.access_token;
  

  if (!token) {
    return next(errorHandler(401, "Unauthorized"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(401, 'Unauthorized'));
    }
    
    req.user = user;
    next();
  });
};

module.exports = authMiddleware; // Export the middleware function

