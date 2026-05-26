import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

const apiClient = {
  // Product endpoints
  getAllProducts: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products`);
      // Backend returns { success, data, count } — normalize to return the inner data array when present
      return { data: response.data?.data ?? response.data };
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },

  getProductById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/${id}`);
      return { data: response.data?.data ?? response.data };
    } catch (error) {
      console.error("Error fetching product:", error);
      throw error;
    }
  },

  // Image endpoints
  getProductImages: async (productId) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/images/product/${productId}`,
      );
      return { data: response.data?.data ?? response.data };
    } catch (error) {
      console.error("Error fetching images:", error);
      throw error;
    }
  },

  // User endpoints
  getAllUsers: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users`);
      return { data: response.data?.data ?? response.data };
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },

  getUserById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/${id}`);
      return { data: response.data?.data ?? response.data };
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  },

  getUserByEmail: async (email) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/users/email/${encodeURIComponent(email)}`,
      );
      return { data: response.data?.data ?? response.data };
    } catch (error) {
      console.error("Error fetching user by email:", error);
      throw error;
    }
  },

  createUser: async (userData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/users`, userData);
      return { data: response.data };
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },

  loginUser: async (credentials) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/users/login`,
        credentials,
      );
      return { data: response.data?.data ?? response.data };
    } catch (error) {
      console.error("Error logging in user:", error);
      throw error;
    }
  },

  adminLogin: async (credentials) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/users/admin/login`,
        credentials,
      );
      return { data: response.data?.data ?? response.data };
    } catch (error) {
      console.error("Error logging in admin:", error);
      throw error;
    }
  },

  adminRegister: async (userData) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/users/admin/register`,
        userData,
      );
      return { data: response.data };
    } catch (error) {
      console.error("Error registering admin:", error);
      throw error;
    }
  },

  updateUser: async (id, userData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/users/${id}`, userData);
      return { data: response.data };
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  },

  deleteUser: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/users/${id}`);
      return { data: response.data };
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  },

  // Image collection
  getAllImages: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/images`);
      return { data: response.data?.data ?? response.data };
    } catch (error) {
      console.error("Error fetching images list:", error);
      throw error;
    }
  },

  getImageById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/images/${id}`);
      return { data: response.data };
    } catch (error) {
      console.error("Error fetching image:", error);
      throw error;
    }
  },

  uploadImage: async (formData) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/images/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      return { data: response.data };
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  },

  updateImage: async (id, imageData) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/images/${id}`,
        imageData,
      );
      return { data: response.data };
    } catch (error) {
      console.error("Error updating image:", error);
      throw error;
    }
  },

  deleteImage: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/images/${id}`);
      return { data: response.data };
    } catch (error) {
      console.error("Error deleting image:", error);
      throw error;
    }
  },

  // Orders
  getAllOrders: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/orders`);
      return { data: response.data?.data ?? response.data };
    } catch (error) {
      // If orders endpoint is not implemented on backend, return empty list instead of throwing
      if (error?.response?.status === 404) {
        console.warn("Orders endpoint not found (404) — returning empty list");
        return { data: [] };
      }
      console.error("Error fetching orders:", error);
      throw error;
    }
  },

  // Order creation
  createOrder: async (orderData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/orders`, orderData);
      return { data: response.data };
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  },

  // Product create/update/delete (supports optional image upload)
  createProduct: async (productData, imageFile = null) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/products`,
        productData,
        {
          headers: { "Content-Type": "application/json" },
        },
      );
      const result = { data: response.data };

      // If image file provided and product id returned, upload it
      const productId = result.data?.data?.id || result.data?.id;
      if (imageFile && productId) {
        const fd = new FormData();
        fd.append("product_id", productId);
        fd.append("image", imageFile);
        try {
          await axios.post(`${API_BASE_URL}/images/upload`, fd);
        } catch (imgErr) {
          console.error("Error uploading product image:", imgErr);
        }
      }

      return result;
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  },

  updateProduct: async (id, productData, imageFile = null) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/products/${id}`,
        productData,
        {
          headers: { "Content-Type": "application/json" },
        },
      );

      if (imageFile) {
        const fd = new FormData();
        fd.append("product_id", id);
        fd.append("image", imageFile);
        try {
          await axios.post(`${API_BASE_URL}/images/upload`, fd);
        } catch (imgErr) {
          console.error("Error uploading product image:", imgErr);
        }
      }

      return { data: response.data };
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  },

  deleteProduct: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/products/${id}`);
      return { data: response.data };
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  },

  // Payment methods
  getPaymentConfig: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/payments/config`);
      return { data: response.data?.data ?? response.data };
    } catch (error) {
      console.error("Error fetching payment config:", error);
      throw error;
    }
  },

  // eSewa Payment
  initializeEsewa: async (paymentData) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/payments/esewa/initialize`,
        paymentData,
      );
      return { data: response.data?.data ?? response.data };
    } catch (error) {
      console.error("Error initializing eSewa:", error);
      throw error;
    }
  },

  verifyEsewa: async (data) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/payments/esewa/verify`,
        { data },
      );
      return { data: response.data?.data ?? response.data };
    } catch (error) {
      console.error("Error verifying eSewa:", error);
      throw error;
    }
  },

  // Khalti Payment
  initializeKhalti: async (paymentData) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/payments/khalti/initialize`,
        paymentData,
      );
      return { data: response.data?.data ?? response.data };
    } catch (error) {
      console.error("Error initializing Khalti:", error);
      throw error;
    }
  },

  verifyKhalti: async (verificationData) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/payments/khalti/verify`,
        verificationData,
      );
      return { data: response.data?.data ?? response.data };
    } catch (error) {
      console.error("Error verifying Khalti:", error);
      throw error;
    }
  },

  // Cash on Delivery
  processCOD: async (orderData) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/payments/cod/process`,
        orderData,
      );
      return { data: response.data?.data ?? response.data };
    } catch (error) {
      console.error("Error processing COD:", error);
      throw error;
    }
  },
};

export default apiClient;
