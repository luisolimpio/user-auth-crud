const jwt = require('jsonwebtoken');

module.exports = (request, response, next) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) return response.status(401).json({ message: 'Token is missing' })

  return next();
}