const { Router } = require('express')

const authMiddleware = require('../middlewares/auth');

const UserController = require('../controllers/UserController');

const userController = new UserController();

const routes = Router();

routes.use(authMiddleware);

routes.get('/users', userController.index);
routes.get('/users/:id', userController.show);
routes.post('/users', userController.store);  
routes.put('/users/:id', userController.update);
routes.delete('/users/:id', userController.destroy);

module.exports = routes;