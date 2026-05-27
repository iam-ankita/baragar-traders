import axios from "axios";

const RAW_API_BASE_URL =
  import.meta?.env?.VITE_API_URL ||
  "https://jubilant-simplicity-production-33e3.up.railway.app/api";

const API_BASE_URL = RAW_API_BASE_URL.replace(/\/+$/, "");

const apiClient = {
  getAllProducts: async () => {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return { data: response.data?.data ?? response.data };
  },

  getProductById: async (id) => {
    const response = await axios.get(`${API_BASE_URL}/products/${id}`);
    return { data: response.data?.data ?? response.data };
  },

  getProductImages: async (productId) => {
    const response = await axios.get(`${API_BASE_URL}/images/product/${productId}`);
    return { data: response.data?.data ?? response.data };
  },

  getAllUsers: async () => {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return { data: response.data?.data ?? response.data };
  },

  getUserById: async (id) => {
    const response = await axios.get(`${API_BASE_URL}/users/${id}`);
    return { data: response.data?.data ?? response.data };
  },

  getUserByEmail: async (email) => {
    const response = await axios.get(
      `${API_BASE_URL}/users/email/${encodeURIComponent(email)}`
    );
    return { data: response.data?.data ?? response.data };
  },

  createUser: async (userData) => {
    const response = await axios.post(`${API_BASE_URL}/users`, userData);
    return { data: response.data };
  },

  loginUser: async (credentials) => {
    const response = await axios.post(`${API_BASE_URL}/users/login`, credentials);
    return { data: response.data?.data ?? response.data };
  },

  adminLogin: async (credentials) => {
    const response = await axios.post(
      `${API_BASE_URL}/users/admin/login`,
      credentials
    );
    return { data: response.data?.data ?? response.data };
  },

  adminRegister: async (userData) => {
    const response = await axios.post(
      `${API_BASE_URL}/users/admin/register`,
      userData
    );
    return { data: response.data };
  },

  updateUser: async (id, userData) => {
    const response = await axios.put(`${API_BASE_URL}/users/${id}`, userData);
    return { data: response.data };
  },

  deleteUser: async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/users/${id}`);
    return { data: response.data };
  },

  getAllImages: async () => {
    const response = await axios.get(`${API_BASE_URL}/images`);
    return { data: response.data?.data ?? response.data };
  },

  getImageById: async (id) => {
    const response = await axios.get(`${API_BASE_URL}/images/${id}`);
    return { data: response.data };
  },

  uploadImage: async (formData) => {
    const response = await axios.post(`${API_BASE_URL}/images/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return { data: response.data };
  },

  updateImage: async (id, imageData) => {
    const response = await axios.put(`${API_BASE_URL}/images/${id}`, imageData);
    return { data: response.data };
  },

  deleteImage: async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/images/${id}`);
    return { data: response.data };
  },

  getAllOrders: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/orders`);
      return { data: response.data?.data ?? response.data };
    } catch (error) {
      if (error?.response?.status === 404) {
        return { data: [] };
      }
      throw error;
    }
  },

  createOrder: async (orderData) => {
    const response = await axios.post(`${API_BASE_URL}/orders`, orderData);
    return { data: response.data };
  },

  createProduct: async (productData, imageFile = null) => {
    const response = await axios.post(`${API_BASE_URL}/products`, productData, {
      headers: { "Content-Type": "application/json" },
    });

    const result = { data: response.data };
    const productId = result.data?.data?.id || result.data?.id;

    if (imageFile && productId) {
      const fd = new FormData();
      fd.append("product_id", productId);
      fd.append("image", imageFile);

      await axios.post(`${API_BASE_URL}/images/upload`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }

    return result;
  },

  updateProduct: async (id, productData, imageFile = null) => {
    const response = await axios.put(`${API_BASE_URL}/products/${id}`, productData, {
      headers: { "Content-Type": "application/json" },
    });

    if (imageFile) {
      const fd = new FormData();
      fd.append("product_id", id);
      fd.append("image", imageFile);

      await axios.post(`${API_BASE_URL}/images/upload`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }

    return { data: response.data };
  },

  deleteProduct: async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/products/${id}`);
    return { data: response.data };
  },

  getPaymentConfig: async () => {
    const response = await axios.get(`${API_BASE_URL}/payments/config`);
    return { data: response.data?.data ?? response.data };
  },

  initializeEsewa: async (paymentData) => {
    const response = await axios.post(
      `${API_BASE_URL}/payments/esewa/initialize`,
      paymentData
    );
    return { data: response.data?.data ?? response.data };
  },

  verifyEsewa: async (data) => {
    const response = await axios.post(`${API_BASE_URL}/payments/esewa/verify`, {
      data,
    });
    return { data: response.data?.data ?? response.data };
  },

  initializeKhalti: async (paymentData) => {
    const response = await axios.post(
      `${API_BASE_URL}/payments/khalti/initialize`,
      paymentData
    );
    return { data: response.data?.data ?? response.data };
  },

  verifyKhalti: async (verificationData) => {
    const response = await axios.post(
      `${API_BASE_URL}/payments/khalti/verify`,
      verificationData
    );
    return { data: response.data?.data ?? response.data };
  },

  processCOD: async (orderData) => {
    const response = await axios.post(
      `${API_BASE_URL}/payments/cod/process`,
      orderData
    );
    return { data: response.data?.data ?? response.data };
  },
};

export default apiClient;
