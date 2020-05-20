'use strict';

const { version, name } = require('../../package');

const { getRedis } = require('../databases/redis');

exports.getName = async (req, res) => {
    const username = await getRedis().getAsync('name');
    res.json({
        title: `${ name } working!`,
        version,
        username
    })
}