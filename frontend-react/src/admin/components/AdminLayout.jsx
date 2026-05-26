import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const AdminLayout = ({ children, title }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminUser");
    navigate("/admin/login");
  };

  const navLinkStyle = ({ isActive }) => ({
    display: "block",
    padding: "12px 16px",
    textDecoration: "none",
    color: isActive ? "#fff" : "#d7d7d7",
    background: isActive ? "#111" : "transparent",
    border: isActive ? "1px solid #2b2b2b" : "1px solid transparent",
    fontSize: "15px",
    fontWeight: isActive ? "600" : "500",
    marginBottom: "8px",
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "260px 1fr",
        background: "#161616",
      }}
    >
      <aside
        style={{
          background: "#0b0b0b",
          color: "#fff",
          padding: "28px 20px",
          borderRight: "1px solid #1f1f1f",
        }}
      >
        <div style={{ marginBottom: "32px" }}>
          <h1
            style={{
              fontSize: "26px",
              margin: 0,
              marginBottom: "6px",
              color: "#d4a017",
            }}
          >
            Baragar
          </h1>
          <p
            style={{
              margin: 0,
              color: "#cfcfcf",
              fontSize: "14px",
            }}
          >
            Admin Panel
          </p>
        </div>

        <nav>
          <NavLink to="/admin/dashboard" end style={navLinkStyle}>
            Dashboard
          </NavLink>

          <NavLink to="/admin/products" style={navLinkStyle}>
            Products
          </NavLink>

          <NavLink to="/admin/users" style={navLinkStyle}>
            Users
          </NavLink>

          <NavLink to="/admin/images" style={navLinkStyle}>
            Images
          </NavLink>
        </nav>
      </aside>

      <main
        style={{
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
        <header
          style={{
            background: "#1f1f1f",
            borderBottom: "1px solid #2a2a2a",
            padding: "20px 30px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                fontSize: "30px",
                color: "#ffffff",
              }}
            >
              {title || "Dashboard"}
            </h2>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
            }}
          >
            <span
              style={{
                fontSize: "15px",
                color: "#cfcfcf",
                fontWeight: "600",
              }}
            >
              Admin
            </span>

            <button
              type="button"
              onClick={handleLogout}
              style={{
                background: "#111",
                color: "#fff",
                border: "1px solid #2b2b2b",
                padding: "10px 16px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Logout
            </button>
          </div>
        </header>

        <div style={{ flex: 1 }}>{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;