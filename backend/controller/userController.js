const { User } = require("../model/User");

// Create a new user (default role: 'user')
const createUser = async (req, res) => {
  try {
    const { username, email, password, phone, address } = req.body;

    // Validate required fields
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Username, email, and password are required",
      });
    }

    const userData = {
      username,
      email,
      password,
      phone: phone || null,
      address: address || null,
      role: "user",
    };

    const result = await User.create(userData);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      userId: result[0].insertId,
    });
  } catch (error) {
    console.error("Error creating user:", error);

    // Handle duplicate entry errors
    if (error.code === "ER_DUP_ENTRY") {
      let message = "Email or username already exists";
      if (error.message.includes("username")) {
        message = "Username already exists";
      } else if (error.message.includes("email")) {
        message = "Email already exists";
      }
      return res.status(400).json({
        success: false,
        message: message,
      });
    }

    res.status(500).json({
      success: false,
      message: "Error creating user",
      error: error.message,
    });
  }
};

// Create a new admin user (role: 'admin')
const createAdminUser = async (req, res) => {
  try {
    const { username, email, password, phone, address } = req.body;

    // Validate required fields
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Username, email, and password are required",
      });
    }

    const userData = {
      username,
      email,
      password,
      phone: phone || null,
      address: address || null,
      role: "admin",
      is_admin: true,
    };

    const result = await User.create(userData);

    res.status(201).json({
      success: true,
      message: "Admin user created successfully",
      userId: result[0].insertId,
    });
  } catch (error) {
    console.error("Error creating admin user:", error);

    // Handle duplicate entry errors
    if (error.code === "ER_DUP_ENTRY") {
      let message = "Email or username already exists";
      if (error.message.includes("username")) {
        message = "Username already exists";
      } else if (error.message.includes("email")) {
        message = "Email already exists";
      }
      return res.status(400).json({
        success: false,
        message: message,
      });
    }

    res.status(500).json({
      success: false,
      message: "Error creating admin user",
      error: error.message,
    });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();

    res.status(200).json({
      success: true,
      data: users,
      count: users.length,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching users",
      error: error.message,
    });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const user = await User.findById(id);

    if (user.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user[0],
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching user",
      error: error.message,
    });
  }
};

// Get user by email
const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await User.findByEmail(email);

    if (user.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user[0],
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching user",
      error: error.message,
    });
  }
};

// Simple login by email + password (no hashing – demo only)
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const users = await User.findByEmail(email);

    if (!users || users.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const user = users[0];

    if (user.password !== password) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Do not return password to client
    const { password: _pw, ...safeUser } = user;

    // Ensure role is included (default to 'user' for legacy users without role)
    if (!safeUser.role) {
      safeUser.role = safeUser.is_admin ? "admin" : "user";
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: safeUser,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({
      success: false,
      message: "Error logging in user",
      error: error.message,
    });
  }
};

// Admin Login using fixed credentials (no register)
const adminLogin = async (req, res) => {
  try {
    // Accept either `email` or `username` from the client as the identifier
    const { email, username, password } = req.body;
    const identifier = (email || username || "").toString();

    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        message: "Identifier (username or email) and password are required",
      });
    }

    const ADMIN_USERNAME = (
      process.env.ADMIN_USERNAME || "nepmart01"
    ).toLowerCase();
    const ADMIN_EMAIL = (
      process.env.ADMIN_EMAIL || "upretisumee07@gmail.com"
    ).toLowerCase();
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "nepmart21@";

    const idLower = identifier.toString().toLowerCase();

    // Validate against fixed admin username OR email, and password
    if (
      !(idLower === ADMIN_EMAIL || idLower === ADMIN_USERNAME) ||
      password !== ADMIN_PASSWORD
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid admin credentials",
      });
    }

    // Return a safe admin user object (do not depend on DB)
    const safeUser = {
      username: ADMIN_USERNAME,
      email: ADMIN_EMAIL,
      is_admin: true,
    };

    res.status(200).json({
      success: true,
      message: "Admin login successful",
      data: safeUser,
    });
  } catch (error) {
    console.error("Error logging in admin:", error);
    res.status(500).json({
      success: false,
      message: "Error logging in",
      error: error.message,
    });
  }
};

// No admin registration endpoint — admin is a fixed single account

// Update user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    // Check if user exists
    const user = await User.findById(id);
    if (user.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await User.update(id, updates);

    res.status(200).json({
      success: true,
      message: "User updated successfully",
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({
      success: false,
      message: "Error updating user",
      error: error.message,
    });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    // Check if user exists
    const user = await User.findById(id);
    if (user.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await User.delete(id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting user",
      error: error.message,
    });
  }
};

module.exports = {
  createUser,
  createAdminUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
  loginUser,
  adminLogin,
};
