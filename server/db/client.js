const { Client } = require('pg');
const CONNECTION_STRING = process.env.DATABASE_URL || 'localhost';
const client = new Client({
    user: 'toasty',
    host: CONNECTION_STRING,
    database: 'postgres',
    password: 'Grantman011$',
    port: '5432'
});

module.exports = client;