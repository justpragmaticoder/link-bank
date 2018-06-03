const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: '1',
        database: 'link-bank'
    }
});
module.exports = knex;