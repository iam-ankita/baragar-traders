import React, { useState, useEffect } from "react";
import apiClient from "../../api/client";
import AdminLayout from "../components/AdminLayout";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalOrders: 0,
    totalImages: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [productsRes, usersRes, imagesRes, ordersRes] = await Promise.all([
        apiClient.getAllProducts(),
        apiClient.getAllUsers(),
        apiClient.getAllImages(),
        apiClient.getAllOrders(),
      ]);

      setStats({
        totalProducts: productsRes?.data ? productsRes.data.length : 0,
        totalUsers: usersRes?.data ? usersRes.data.length : 0,
        totalOrders: ordersRes?.data ? ordersRes.data.length : 0,
        totalImages: imagesRes?.data ? imagesRes.data.length : 0,
      });
    } catch (error) {
      console.error("Error loading stats:", error);
    }
  };

  const cardStyle = {
    background: "#ffffff",
    border: "1px solid #ddd5ca",
    padding: "24px",
    display: "flex",
    alignItems: "center",
    gap: "18px",
  };

  const iconStyle = {
    width: "58px",
    height: "58px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "26px",
    background: "#111",
    color: "#fff",
    flexShrink: 0,
  };

  const titleStyle = {
    fontSize: "16px",
    color: "#5c5146",
    margin: 0,
    marginBottom: "8px",
  };

  const numberStyle = {
    fontSize: "32px",
    fontWeight: "700",
    color: "#1f1f1f",
    margin: 0,
  };

  return (
    <AdminLayout title="Dashboard">
      <div
        style={{
          background: "#f3f0ea",
          minHeight: "100vh",
          padding: "30px",
        }}
      >
        <div
          style={{
            background: "#fff",
            border: "1px solid #ddd5ca",
            padding: "30px",
            marginBottom: "24px",
          }}
        >
          <h2
            style={{
              fontSize: "36px",
              color: "#1f1f1f",
              margin: 0,
              marginBottom: "10px",
            }}
          >
            Admin Dashboard
          </h2>
          <p
            style={{
              fontSize: "16px",
              color: "#5c5146",
              margin: 0,
            }}
          >
            Overview of Baragar Traders website activity and management data.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          <div style={cardStyle}>
            <div style={iconStyle}>👥</div>
            <div>
              <h3 style={titleStyle}>Total Users</h3>
              <p style={numberStyle}>{stats.totalUsers}</p>
            </div>
          </div>

          <div style={cardStyle}>
            <div style={iconStyle}>📦</div>
            <div>
              <h3 style={titleStyle}>Total Products</h3>
              <p style={numberStyle}>{stats.totalProducts}</p>
            </div>
          </div>

          <div style={cardStyle}>
            <div style={iconStyle}>🖼️</div>
            <div>
              <h3 style={titleStyle}>Total Images</h3>
              <p style={numberStyle}>{stats.totalImages}</p>
            </div>
          </div>

          <div style={cardStyle}>
            <div style={iconStyle}>🛒</div>
            <div>
              <h3 style={titleStyle}>Total Orders</h3>
              <p style={numberStyle}>{stats.totalOrders}</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;