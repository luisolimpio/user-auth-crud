const { Router } = require('express');

const routes = Router();

routes.get('/', (request, response) => {
  return response.json({ Hello: 'World' });
});

module.exports = routes;