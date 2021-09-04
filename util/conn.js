const mysql = require('mysql2');

const pool = mysql.createPool({
    // host: process.env.host,
    // user: process.env.user,
    // password: process.env.password,
    // database: process.env.database

    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'smart'

});

module.exports = pool.promise();