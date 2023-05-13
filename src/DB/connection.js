const mysql = require('mysql2/promise');
require ("dotenv").config()
const host= process.env.DBHOST 
const password= process.env.DBPASSWORD

const connection = mysql.createPool({
  host: host | '127.0.0.1',
  user: 'root',
  password: password,
  port: 3306,
  database: 'MANGA'
  
});

module.exports = connection;