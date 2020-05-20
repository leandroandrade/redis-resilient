'use strict';

const Promise = require('bluebird');

const redis = require('redis');
Promise.promisifyAll(redis);

const state = {
    client: null
};

const connect = async ({ url }) => {
    if (state.client) return;

    const client = redis.createClient(url, {
        retry_strategy: (options) => {
            const { error, total_retry_time, attempt } = options;

            if (error && error.code === 'ECONNREFUSED') {
                console.log(`> REDIS_ERROR: falha na conexao: ${ error.code }`);
            }

            if (total_retry_time > 1000 * 15) {
                console.log('> REDIS_ERROR: Retry time exhausted');
            }

            if (attempt > 10) {
                console.log('> REDIS_ERROR: 10 attempts done');
            }

            console.log(`> REDIS: tentativa ${ attempt } | reconectando...`);

            return Math.min(attempt * 100, 3000);
        },
    });

    state.client = client;

    client.on('connect', () => console.log('> REDIS: conexao estabelecida com sucesso'));
    // client.on('ready', () => console.log('> REDIS: conexao pronta para ser utilizada'));
    // client.on('reconnecting', () => console.log('> REDIS: reconectando com o servidor...'));
    client.on('error', (err) => console.error('> REDIS_ERROR: ERRO na conexao do REDIS: ', err));
}

const getRedis = () => state.client;

module.exports = {
    connect,
    getRedis
};