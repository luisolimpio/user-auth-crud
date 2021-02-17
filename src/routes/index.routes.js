const { Router } = require('express');

const userRoutes = require('./user.routes');
const sessionRoutes = require('./session.routes');

const routes = Router();

routes.use(userRoutes);

routes.use(sessionRoutes);

module.exports = routes;