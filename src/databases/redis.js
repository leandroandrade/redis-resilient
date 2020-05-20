'use strict';

const Promise = require('bluebird');

const redis = require('redis');
Promise.promisifyAll(redis);

const client = redis.createClient('6379', "localhost", {
    retry_strategy: (options) => {
        const { error, total_retry_time, attempt } = options;

        if (error && error.code === "ECONNREFUSED") {
            console.log(`> REDIS_ERROR: falha na conexao: ${ error.code }`);
        }

        if (total_retry_time > 1000 * 15) {
            console.log('> REDIS_ERROR: Retry time exhausted');
        }

        if (options.attempt > 10) {
            console.log('> REDIS_ERROR: 10 attempts done');
        }

        console.log(`> REDIS: tentativa ${ options.attempt } | reconectando...`);

        return Math.min(options.attempt * 100, 3000); //in ms
    },
});

client.on('connect', () => console.log('> REDIS: conexao estabelecida com sucesso'));
client.on('ready', () => console.log('> REDIS: conexao pronta para ser utilizada'));
client.on('reconnecting', () => console.log('> REDIS: reconectando com o servidor...'));
client.on('error', (err) => console.error('> REDIS_ERROR: ERRO na conexao do REDIS: ', err));

module.exports = client;