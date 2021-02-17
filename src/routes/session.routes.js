const { Router } = require('express');

const SessionController = require('../controllers/SessionController');

const sessionController = new SessionController();

const routes = Router();

routes.post('/sessions', sessionController.store);

module.exports = routes;
