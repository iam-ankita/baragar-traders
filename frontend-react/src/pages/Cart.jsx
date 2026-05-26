import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } =
    useContext(CartContext);

  if (cart.length === 0) {
    return (
      <main style={{ background: "#f3f0ea", minHeight: "100vh", padding: "40px 0" }}>
        <section
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            background: "#fff",
            border: "1px solid #ddd5ca",
            padding: "60px 40px",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: "40px",
              color: "#1f1f1f",
              marginBottom: "16px",
            }}
          >
            Your Cart
          </h1>

          <p
            style={{
              fontSize: "17px",
              color: "#5c5146",
              marginBottom: "24px",
            }}
          >
            Your cart is empty.
          </p>

          <Link to="/shop" style={{ textDecoration: "none" }}>
            <button
              style={{
                padding: "12px 24px",
                backgroundColor: "#111",
                color: "white",
                border: "none",
                cursor: "pointer",
                fontSize: "15px",
              }}
            >
              Continue Shopping
            </button>
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main style={{ background: "#f3f0ea", minHeight: "100vh", padding: "40px 0" }}>
      <section
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          background: "#fff",
          border: "1px solid #ddd5ca",
          padding: "40px",
        }}
      >
        <div style={{ marginBottom: "30px" }}>
          <h1
            style={{
              fontSize: "40px",
              color: "#1f1f1f",
              marginBottom: "10px",
            }}
          >
            Your Cart
          </h1>
          <p
            style={{
              fontSize: "16px",
              color: "#5c5146",
            }}
          >
            Review your selected products before checkout.
          </p>
        </div>

        <div style={{ display: "grid", gap: "18px" }}>
          {cart.map((item, index) => (
            <div
              key={index}
              style={{
                display: "grid",
                gridTemplateColumns: "140px 1fr",
                gap: "20px",
                alignItems: "center",
                border: "1px solid #e5ddd2",
                background: "#faf8f4",
                padding: "20px",
              }}
            >
              <div
                style={{
                  width: "140px",
                  height: "140px",
                  background: "#fff",
                  border: "1px solid #ece6dc",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                <img
                  src={item.image || "https://via.placeholder.com/140x140"}
                  alt={item.name}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                  onError={(e) =>
                    (e.target.src = "https://via.placeholder.com/140x140")
                  }
                />
              </div>

              <div>
                <h3
                  style={{
                    fontSize: "24px",
                    color: "#1f1f1f",
                    marginBottom: "10px",
                  }}
                >
                  {item.name}
                </h3>

                <p
                  style={{
                    fontSize: "16px",
                    color: "#666",
                    marginBottom: "12px",
                  }}
                >
                  Price: <strong>Rs {item.price}</strong>
                </p>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "14px",
                    flexWrap: "wrap",
                  }}
                >
                  <span style={{ fontWeight: "600", color: "#333" }}>
                    Quantity:
                  </span>

                  <button
                    onClick={() => updateQuantity(index, (item.qty || 1) - 1)}
                    style={{
                      width: "34px",
                      height: "34px",
                      backgroundColor: "#111",
                      color: "white",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "18px",
                    }}
                  >
                    −
                  </button>

                  <span
                    style={{
                      minWidth: "30px",
                      textAlign: "center",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    {item.qty || 1}
                  </span>

                  <button
                    onClick={() => updateQuantity(index, (item.qty || 1) + 1)}
                    style={{
                      width: "34px",
                      height: "34px",
                      backgroundColor: "#111",
                      color: "white",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "18px",
                    }}
                  >
                    +
                  </button>
                </div>

                <p
                  style={{
                    fontSize: "17px",
                    fontWeight: "700",
                    color: "#7a4b21",
                    marginBottom: "14px",
                  }}
                >
                  Subtotal: Rs {((item.price || 0) * (item.qty || 1)).toFixed(0)}
                </p>

                <button
                  onClick={() => removeFromCart(index)}
                  style={{
                    padding: "10px 18px",
                    backgroundColor: "#a32020",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "14px",
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: "30px",
            paddingTop: "24px",
            borderTop: "1px solid #ddd5ca",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <h2
            style={{
              fontSize: "30px",
              color: "#1f1f1f",
            }}
          >
            Total: <span style={{ color: "#7a4b21" }}>Rs {getTotalPrice().toFixed(0)}</span>
          </h2>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link to="/shop" style={{ textDecoration: "none" }}>
              <button
                style={{
                  padding: "12px 20px",
                  backgroundColor: "#fff",
                  color: "#111",
                  border: "1px solid #111",
                  cursor: "pointer",
                  fontSize: "15px",
                }}
              >
                Continue Shopping
              </button>
            </Link>

            <Link to="/checkout" style={{ textDecoration: "none" }}>
              <button
                style={{
                  padding: "12px 22px",
                  backgroundColor: "#111",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "15px",
                }}
              >
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Cart;