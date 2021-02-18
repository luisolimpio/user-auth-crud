const { Router } = require('express')

const authMiddleware = require('../middlewares/auth');

const UserController = require('../controllers/UserController');

const userController = new UserController();

const routes = Router();

routes.get('/users', authMiddleware, userController.index);
routes.get('/users/:id', authMiddleware, userController.show);
routes.post('/users', userController.store);  
routes.put('/users/:id',authMiddleware, userController.update);
routes.delete('/users/:id', authMiddleware, userController.destroy);

module.exports = routes;