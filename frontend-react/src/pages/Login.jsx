import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import apiClient from "../api/client";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await apiClient.loginUser({
        email: form.email,
        password: form.password,
      });

      const user = response.data || response;

      if (user.role === "admin" || user.is_admin) {
        setError("Admin users must use the admin login page.");
        setSubmitting(false);
        return;
      }

      localStorage.setItem("user", JSON.stringify(user));
      const fromCheckout = location.state?.fromCheckout;
      navigate(fromCheckout ? "/checkout" : "/");
    } catch (err) {
      console.error("Login failed", err);
      setError("Invalid email or password.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main style={{ background: "#f3f0ea", minHeight: "100vh", padding: "40px 0" }}>
      <section
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          background: "#fff",
          border: "1px solid #ddd5ca",
          padding: "60px 40px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "35px" }}>
          <h1
            style={{
              fontSize: "40px",
              color: "#1f1f1f",
              marginBottom: "12px",
            }}
          >
            Login
          </h1>
          <p
            style={{
              fontSize: "16px",
              color: "#5c5146",
            }}
          >
            Sign in to continue shopping and manage your cart.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              width: "100%",
              maxWidth: "460px",
              background: "#faf8f4",
              border: "1px solid #e5ddd2",
              padding: "32px",
            }}
          >
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
              Welcome Back
            </div>

            <h3
              style={{
                fontSize: "30px",
                color: "#1f1f1f",
                marginBottom: "22px",
              }}
            >
              Login to Baragar Traders
            </h3>

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
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #d9d0c4",
                  background: "#fff",
                  fontSize: "15px",
                }}
              />
            </div>

            <div style={{ marginBottom: "18px" }}>
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
                name="password"
                type="password"
                required
                placeholder="Your password"
                value={form.password}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #d9d0c4",
                  background: "#fff",
                  fontSize: "15px",
                }}
              />
            </div>

            {error && (
              <p
                style={{
                  color: "#c62828",
                  fontSize: "14px",
                  marginBottom: "14px",
                }}
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              style={{
                width: "100%",
                background: "#111",
                color: "#fff",
                border: "none",
                padding: "12px 20px",
                fontSize: "15px",
                cursor: "pointer",
                marginBottom: "16px",
              }}
            >
              {submitting ? "Logging in..." : "Login"}
            </button>

            <p
              style={{
                fontSize: "14px",
                color: "#666",
                textAlign: "center",
                lineHeight: "1.7",
              }}
            >
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                style={{
                  color: "#7a4b21",
                  fontWeight: "600",
                  textDecoration: "none",
                }}
              >
                Register here
              </Link>
              .
            </p>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Login;