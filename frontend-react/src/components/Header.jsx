import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const Header = () => {
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);

  const user = JSON.parse(localStorage.getItem("user"));

  // total cart items
  const totalItems = cart.reduce((sum, item) => sum + (item.qty || 1), 0);

  // get first letter of username/email
  const getUserInitial = () => {
    if (!user) return "";
    if (user.username) return user.username.charAt(0).toUpperCase();
    if (user.email) return user.email.charAt(0).toUpperCase();
    return "U";
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header
      style={{
        background: "#000",
        padding: "15px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "#fff",
      }}
    >
      {/* LOGO */}
      <h2 style={{ color: "#d4a017", fontWeight: "600" }}>
        बारागर <span style={{ color: "#fff" }}>Traders</span>
      </h2>

      {/* NAV LINKS */}
      <nav style={{ display: "flex", gap: "30px" }}>
        <NavLink to="/" style={navStyle}>
          Home
        </NavLink>
        <NavLink to="/shop" style={navStyle}>
          Shop
        </NavLink>
        <NavLink to="/about" style={navStyle}>
          About
        </NavLink>
        <NavLink to="/contact" style={navStyle}>
          Contact
        </NavLink>
      </nav>

      {/* RIGHT SECTION */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "25px",
        }}
      >
        {/* USER */}
        {user ? (
          <div style={{ textAlign: "center" }}>
            {/* Circle */}
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "#d4a017",
                color: "#111",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px",
                fontWeight: "700",
                margin: "0 auto",
              }}
            >
              {getUserInitial()}
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              style={{
                marginTop: "4px",
                background: "none",
                border: "none",
                color: "#ccc",
                fontSize: "12px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" style={{ color: "#fff", textDecoration: "none" }}>
            Login
          </Link>
        )}

        {/* CART */}
        <Link
          to="/cart"
          style={{
            textAlign: "center",
            color: "#fff",
            textDecoration: "none",
            fontSize: "12px",
          }}
        >
          <div style={{ fontSize: "18px" }}>🛒</div>
          <div>Cart ({totalItems})</div>
        </Link>
      </div>
    </header>
  );
};

const navStyle = ({ isActive }) => ({
  color: isActive ? "#d4a017" : "#fff",
  textDecoration: "none",
  fontSize: "14px",
});

export default Header;