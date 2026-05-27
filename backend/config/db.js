const mysql = require('mysql2');

// Create the connection pool using environment variables
const pool = mysql.createPool({
  // If process.env.DB_HOST exists (on Railway), use it. Otherwise, fall back to 'localhost' for your local machine.
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '', 
  
  // Note: Your Railway DB name defaults to 'railway', but locally you use 'nepmart'. 
  // This syntax handles both flawlessly.
  database: process.env.DB_NAME || 'nepmart',
  
  // Convert port to a number, defaulting to 3306
  port: parseInt(process.env.DB_PORT || '3306', 10),
  
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Export the promise-based version for cleaner code
module.exports = pool.promise();
