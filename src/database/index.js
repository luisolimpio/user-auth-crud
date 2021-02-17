const Sequelize = require('sequelize');

const databaseConfig = require('../config/database');

const User = require('../models/User');

const connection = new Sequelize(databaseConfig);

User.init(connection);

module.exports = connection;