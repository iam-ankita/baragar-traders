// Database Migration - Run this to fix the database schema
// This file helps fix the database schema

const db = require("./config/db");

async function migrateDatabase() {
  try {
   
   
    // Recreate the images table with correct schema
    const imageTableQuery = `
      CREATE TABLE IF NOT EXISTS images (
        id INT AUTO_INCREMENT PRIMARY KEY,
        product_id INT NOT NULL,
        image_path VARCHAR(255) NOT NULL,
        image_name VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
        INDEX idx_product_id (product_id)
      )
    `;

    await db.query(imageTableQuery);
    console.log("Images table recreated with correct schema");

    return true;
  } catch (error) {
    console.error("Migration error:", error);
    return false;
  }
}

// Add role column to users table
async function addRoleColumn() {
  try {
    // Check if column exists first
    const result = await db.query(`
      SELECT COLUMN_NAME 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_SCHEMA = DATABASE() 
        AND TABLE_NAME = 'users' 
        AND COLUMN_NAME = 'role'
    `);

    // Handle both mysql2 formats: [rows, fields] or rows directly
    const columns =
      Array.isArray(result) && Array.isArray(result[0]) ? result[0] : result;

    if (!columns || columns.length === 0) {
      await db.query(`
        ALTER TABLE users 
        ADD COLUMN role ENUM('user', 'admin') DEFAULT 'user'
      `);
      console.log("Role column added to users table");

      // Update existing admin users
      await db.query(`
        UPDATE users SET role = 'admin' WHERE is_admin = TRUE
      `);
      console.log("Existing admin users updated with admin role");
    } else {
      console.log("Role column already exists");
    }

    return true;
  } catch (error) {
    // Column might already exist - ignore duplicate column error
    if (error.code === "ER_DUP_FIELDNAME") {
      console.log("Role column already exists (caught duplicate error)");
      return true;
    }
    console.error("Error adding role column:", error);
    return false;
  }
}

// Run migration if this file is executed directly
if (require.main === module) {
  Promise.all([migrateDatabase(), addRoleColumn()]).then(() => {
    console.log("Migration complete");
    process.exit(0);
  });
}

module.exports = { migrateDatabase, addRoleColumn };
