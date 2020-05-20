'use strict';

const { version, name } = require('../../package');

const redis = require('../databases/redis');

exports.getName = async (req, res) => {
    const username = await redis.getAsync('name');
    res.json({
        title: `${ name } working!`,
        version,
        username
    })
}