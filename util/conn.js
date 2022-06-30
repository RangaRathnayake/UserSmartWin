const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    port: 7381

    // host: 'localhost',
    // user: 'root',
    // password: 'root',
    // database: 'swin'

});

module.exports = pool.promise();