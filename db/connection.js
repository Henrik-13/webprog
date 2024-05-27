import mysql from 'mysql2/promise.js';

const pool = mysql.createPool({
  connectionLimit: 10,
  database: 'Vonattarsasag',
  host: 'localhost',
  port: '3306',
  user: 'admin',
  password: 'Hcddh3ds%43HG5&',
});

export default pool;
