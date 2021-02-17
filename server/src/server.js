require('dotenv').config();

const express = require('express');

const routes = require('./routes/index.routes');

require('./database');

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333);