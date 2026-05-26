import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import apiClient from "../../api/client";

const AdminRegisterComponent = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const adminUser = localStorage.getItem("adminUser");
    if (adminUser) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!username || !email || !password) {
      setError("Please fill in all required fields");
      return;
    }

    setIsLoading(true);

    try {
      const res = await apiClient.adminRegister({
        username,
        email,
        password,
        phone: phone || null,
      });

      const userId = res.data?.userId;
      if (!userId) {
        throw new Error("No userId returned from server");
      }

      const userRes = await apiClient.getUserById(userId);
      const user = userRes.data || userRes;

      localStorage.setItem("adminUser", JSON.stringify(user));
      localStorage.removeItem("user");

      setSuccess("Admin account created successfully! Redirecting...");

      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 1500);
    } catch (err) {
      console.error("Admin registration failed:", err);
      setError(
        err.response?.data?.message ||
          "Registration failed. Please check your details and try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main
      style={{
        background: "#f3f0ea",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          background: "#fff",
          border: "1px solid #ddd5ca",
          padding: "36px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div
            style={{
              display: "inline-block",
              background: "#111",
              color: "#fff",
              padding: "6px 12px",
              fontSize: "13px",
              marginBottom: "14px",
            }}
          >
            Admin Access
          </div>

          <h1
            style={{
              fontSize: "34px",
              color: "#1f1f1f",
              marginBottom: "10px",
            }}
          >
            Admin Registration
          </h1>

          <p
            style={{
              color: "#5c5146",
              fontSize: "15px",
              margin: 0,
            }}
          >
            Create a new admin account.
          </p>
        </div>

        {error && (
          <div
            style={{
              background: "#fff4f4",
              border: "1px solid #e3bcbc",
              color: "#a32020",
              padding: "12px 14px",
              marginBottom: "18px",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}

        {success && (
          <div
            style={{
              background: "#f0fff4",
              border: "1px solid #bde0c5",
              color: "#1f7a3d",
              padding: "12px 14px",
              marginBottom: "18px",
              fontSize: "14px",
            }}
          >
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "16px" }}>
            <label
              htmlFor="username"
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
                color: "#333",
              }}
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
              required
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #d9d0c4",
                background: "#fff",
                fontSize: "15px",
              }}
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label
              htmlFor="email"
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
                color: "#333",
              }}
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #d9d0c4",
                background: "#fff",
                fontSize: "15px",
              }}
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label
              htmlFor="password"
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
                color: "#333",
              }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              required
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #d9d0c4",
                background: "#fff",
                fontSize: "15px",
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label
              htmlFor="phone"
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
                color: "#333",
              }}
            >
              Phone (optional)
            </label>
            <input
              id="phone"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={isLoading}
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #d9d0c4",
                background: "#fff",
                fontSize: "15px",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: "100%",
              background: "#111",
              color: "#fff",
              border: "none",
              padding: "12px 20px",
              fontSize: "15px",
              cursor: "pointer",
              marginBottom: "18px",
            }}
          >
            {isLoading ? "Creating Account..." : "Create Admin Account"}
          </button>
        </form>

        <div
          style={{
            textAlign: "center",
            paddingTop: "18px",
            borderTop: "1px solid #e5ddd2",
          }}
        >
          <p
            style={{
              color: "#666",
              fontSize: "14px",
              margin: 0,
            }}
          >
            Already have an account?{" "}
            <Link
              to="/admin/login"
              style={{
                color: "#7a4b21",
                fontWeight: "600",
                textDecoration: "none",
              }}
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default AdminRegisterComponent;