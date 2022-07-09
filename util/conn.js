const mysql = require('mysql2');

const pool = mysql.createPool({
    
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,

    // host: "127.0.0.1",
    // user: "user",
    // password: "R@bB%WxP^ZUm2Qx*",
    // database: "smart_win"

});

module.exports = pool.promise();