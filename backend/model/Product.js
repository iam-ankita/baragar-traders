const db = require("../config/db");

// Product Table Structure
const productTableQuery = `
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category VARCHAR(100),
  quantity INT(11) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)`;

// Create Product Table
const createProductTable = async () => {
  try {
    await db.query(productTableQuery);

    // Add quantity column if old table already exists without quantity
    await db.query(`
      ALTER TABLE products
      ADD COLUMN IF NOT EXISTS quantity INT(11) NOT NULL DEFAULT 0
    `);

    console.log("Products table created or already exists");
  } catch (err) {
    console.error("Error creating products table:", err);
  }
};

// Product Model Functions
const Product = {
  create: async (productData) => {
    const query = "INSERT INTO products SET ?";
    return await db.query(query, [productData]);
  },

  findById: async (id) => {
    const query = "SELECT * FROM products WHERE id = ?";
    const [rows] = await db.query(query, [id]);
    return rows;
  },

  findAll: async () => {
    const query = "SELECT * FROM products";
    const [rows] = await db.query(query);
    return rows;
  },

  findByCategory: async (category) => {
    const query = "SELECT * FROM products WHERE category = ?";
    const [rows] = await db.query(query, [category]);
    return rows;
  },

  findActive: async () => {
    const query = "SELECT * FROM products";
    const [rows] = await db.query(query);
    return rows;
  },

  update: async (id, productData) => {
    const query = "UPDATE products SET ? WHERE id = ?";
    return await db.query(query, [productData, id]);
  },

  delete: async (id) => {
    const query = "DELETE FROM products WHERE id = ?";
    return await db.query(query, [id]);
  },

  search: async (searchTerm) => {
    const query =
      "SELECT * FROM products WHERE name LIKE ? OR description LIKE ? OR category LIKE ?";
    const term = `%${searchTerm}%`;
    const [rows] = await db.query(query, [term, term, term]);
    return rows;
  },
};

module.exports = { Product, createProductTable };