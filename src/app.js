'use strict';

const express = require('express');
const redis = require('./databases/redis');
const app = express();

redis.connect({ url: 'redis://localhost:6379' });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', require('./routes'));

module.exports = app;