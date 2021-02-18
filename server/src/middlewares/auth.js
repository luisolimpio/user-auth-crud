const jwt = require('jsonwebtoken');
const { promisify } = require('util')

module.exports = async (request, response, next) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) return response.status(401).json({ message: 'Token is missing' })

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, process.env.APP_JWT_SECRET)

    request.userId = decoded.id;

    return next();
  } catch (err) {
    return response.status(401).json({ message: 'Token invalid' })
  }
}