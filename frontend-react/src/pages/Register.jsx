import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import apiClient from "../api/client";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const adminUser = localStorage.getItem("adminUser");
    if (adminUser) {
      navigate("/admin/dashboard", { replace: true });
    }

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
      const res = await apiClient.createUser(form);
      const userId = res.data?.userId;

      if (!userId) {
        throw new Error("No userId returned from server");
      }

      const userRes = await apiClient.getUserById(userId);
      const user = userRes.data || userRes;

      localStorage.removeItem("adminUser");
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/checkout");
    } catch (err) {
      console.error("Registration failed", err);
      setError("Registration failed. Please check your details.");
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
          <h1 style={{ fontSize: "40px", color: "#1f1f1f", marginBottom: "12px" }}>
            Create an Account
          </h1>
          <p style={{ fontSize: "16px", color: "#5c5146" }}>
            Register to shop faster and manage your orders easily.
          </p>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <form
            onSubmit={handleSubmit}
            style={{
              width: "100%",
              maxWidth: "500px",
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
              New Account
            </div>

            <h3 style={{ fontSize: "28px", marginBottom: "22px", color: "#1f1f1f" }}>
              Register with Baragar Traders
            </h3>

            {/* Username */}
            <div style={{ marginBottom: "14px" }}>
              <label style={{ display: "block", marginBottom: "6px", fontWeight: "600" }}>
                Username
              </label>
              <input
                name="username"
                type="text"
                required
                value={form.username}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #d9d0c4",
                }}
              />
            </div>

            {/* Email */}
            <div style={{ marginBottom: "14px" }}>
              <label style={{ display: "block", marginBottom: "6px", fontWeight: "600" }}>
                Email
              </label>
              <input
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #d9d0c4",
                }}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: "14px" }}>
              <label style={{ display: "block", marginBottom: "6px", fontWeight: "600" }}>
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                value={form.password}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #d9d0c4",
                }}
              />
            </div>

            {/* Phone */}
            <div style={{ marginBottom: "14px" }}>
              <label style={{ display: "block", marginBottom: "6px", fontWeight: "600" }}>
                Phone
              </label>
              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #d9d0c4",
                }}
              />
            </div>

            {/* Address */}
            <div style={{ marginBottom: "18px" }}>
              <label style={{ display: "block", marginBottom: "6px", fontWeight: "600" }}>
                Address
              </label>
              <textarea
                name="address"
                rows={3}
                value={form.address}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #d9d0c4",
                }}
              />
            </div>

            {error && (
              <p style={{ color: "#c62828", fontSize: "14px", marginBottom: "12px" }}>
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
                padding: "12px",
                border: "none",
                cursor: "pointer",
                marginBottom: "14px",
              }}
            >
              {submitting ? "Registering..." : "Register"}
            </button>

            <p style={{ textAlign: "center", fontSize: "14px" }}>
              Already have an account?{" "}
              <Link to="/login" style={{ color: "#7a4b21", fontWeight: "600" }}>
                Login here
              </Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Register;