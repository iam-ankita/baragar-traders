import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import apiClient from "../../api/client";

const LoginComponent = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    try {
      const response = await apiClient.loginUser({ email, password });
      const user = response.data || response;

      if (user.role !== "admin" && !user.is_admin) {
        setError("Access denied. Admin accounts only.");
        setIsLoading(false);
        return;
      }

      localStorage.setItem("adminUser", JSON.stringify(user));
      localStorage.removeItem("user");
      navigate("/admin/dashboard");
    } catch (err) {
      try {
        const response = await apiClient.adminLogin({ email, password });
        const user = response.data || response;

        localStorage.setItem("adminUser", JSON.stringify(user));
        localStorage.removeItem("user");
        navigate("/admin/dashboard");
      } catch (fallbackErr) {
        setError(
          fallbackErr.response?.data?.message ||
            err.response?.data?.message ||
            "Login failed. Please try again.",
        );
        console.error("Login error:", fallbackErr);
      }
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
            Admin Login
          </h1>

          <p
            style={{
              color: "#5c5146",
              fontSize: "15px",
              margin: 0,
            }}
          >
            Enter your credentials to access the dashboard.
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

        <form onSubmit={handleSubmit}>
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
              Username / Email
            </label>
            <input
              id="email"
              type="text"
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

          <div style={{ marginBottom: "20px" }}>
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
              placeholder="Enter your password"
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
            {isLoading ? "Logging in..." : "Login"}
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
            Don't have an admin account?{" "}
            <Link
              to="/admin/register"
              style={{
                color: "#7a4b21",
                fontWeight: "600",
                textDecoration: "none",
              }}
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default LoginComponent;