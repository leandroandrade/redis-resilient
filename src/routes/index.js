'use strict';

const router = require('express').Router();
const { getName } = require('../controllers/data-controller');

router.get('/', getName);

module.exports = router;
