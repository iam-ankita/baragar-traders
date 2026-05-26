const mysql = require('mysql2');

// Create the connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',      // Replace with your MySQL username
  password: '', // Replace with your MySQL password
  database: 'nepmart',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Export the promise-based version for cleaner code
module.exports = pool.promise();