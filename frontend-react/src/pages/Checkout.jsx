import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import apiClient from "../api/client";

const Checkout = () => {
  const { cart, getTotalPrice, clearCart } = useContext(CartContext);
  const [searchParams] = useSearchParams();

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [submitting, setSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const esewaFormRef = useRef(null);
  const navigate = useNavigate();

  const generateOrderId = () => {
    return `NM-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) {
      navigate("/login", { state: { fromCheckout: true } });
      return;
    }

    try {
      const user = JSON.parse(stored);
      setForm((prev) => ({
        ...prev,
        name: user.username || user.name || "",
        email: user.email || "",
        address: user.address || "",
        phone: user.phone || "",
      }));
    } catch {
      navigate("/login", { state: { fromCheckout: true } });
    }
  }, [navigate]);

  useEffect(() => {
    const handlePaymentCallback = async () => {
      const pidx = searchParams.get("pidx");
      const txnId = searchParams.get("txnId");
      const status = searchParams.get("status");

      if (pidx && status === "Completed") {
        setSubmitting(true);
        try {
          const result = await apiClient.verifyKhalti({ pidx, txnId });
          if (result.data?.status === "completed") {
            clearCart();
            setOrderPlaced(true);
          } else {
            setPaymentError(
              "Payment verification failed. Please contact support.",
            );
          }
        } catch (error) {
          setPaymentError("Failed to verify payment. Please contact support.");
        } finally {
          setSubmitting(false);
        }
      } else if (status === "Canceled" || status === "Failed") {
        setPaymentError("Payment was cancelled or failed. Please try again.");
      }
    };

    handlePaymentCallback();
  }, [searchParams, clearCart]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setPaymentError(null);
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    setPaymentError(null);
  };

  const handleEsewaPayment = async (orderId) => {
    try {
      const result = await apiClient.initializeEsewa({
        amount: getTotalPrice(),
        orderId: orderId,
        productName: "Baragar Traders Order",
      });

      if (result.data?.paymentUrl && result.data?.paymentData) {
        const form = document.createElement("form");
        form.method = "POST";
        form.action = result.data.paymentUrl;

        Object.entries(result.data.paymentData).forEach(([key, value]) => {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = value;
          form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
      } else {
        throw new Error("Invalid eSewa response");
      }
    } catch (error) {
      throw new Error("Failed to initialize eSewa payment");
    }
  };

  const handleKhaltiPayment = async (orderId) => {
    try {
      const result = await apiClient.initializeKhalti({
        amount: getTotalPrice(),
        orderId: orderId,
        productName: "Baragar Traders Order",
        customerInfo: {
          name: form.name,
          email: form.email,
          phone: form.phone,
        },
      });

      if (result.data?.paymentUrl) {
        window.location.href = result.data.paymentUrl;
      } else {
        throw new Error("Invalid Khalti response");
      }
    } catch (error) {
      throw new Error("Failed to initialize Khalti payment");
    }
  };

  const handleCODPayment = async (orderId) => {
    try {
      await apiClient.processCOD({
        orderId: orderId,
        amount: getTotalPrice(),
        customerInfo: {
          name: form.name,
          email: form.email,
          phone: form.phone,
          address: form.address,
        },
      });

      const orderPayload = {
        customer_name: form.name,
        customer_email: form.email,
        customer_address: form.address,
        customer_phone: form.phone,
        total_amount: getTotalPrice(),
        payment_method: "cod",
        payment_status: "pending",
        items: cart.map((item) => ({
          product_id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.qty || 1,
        })),
      };

      await apiClient.createOrder(orderPayload);
      clearCart();
      setOrderPlaced(true);
    } catch (error) {
      throw new Error("Failed to process Cash on Delivery order");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cart.length) {
      alert("Your cart is empty. Add some items first.");
      return;
    }

    setSubmitting(true);
    setPaymentError(null);

    try {
      const orderId = generateOrderId();

      localStorage.setItem(
        "pendingOrder",
        JSON.stringify({
          orderId,
          form,
          cart,
          totalAmount: getTotalPrice(),
          paymentMethod,
        }),
      );

      switch (paymentMethod) {
        case "esewa":
          await handleEsewaPayment(orderId);
          break;
        case "khalti":
          await handleKhaltiPayment(orderId);
          break;
        case "cod":
        default:
          await handleCODPayment(orderId);
          break;
      }
    } catch (error) {
      console.error("Error placing order:", error);
      setPaymentError(
        error.message || "Failed to place order. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (orderPlaced) {
    return (
      <main
        style={{
          background: "#f3f0ea",
          minHeight: "100vh",
          padding: "40px 0",
        }}
      >
        <section
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            background: "#fff",
            border: "1px solid #ddd5ca",
            padding: "80px 40px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "70px",
              height: "70px",
              margin: "0 auto 20px",
              borderRadius: "50%",
              background: "#111",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "30px",
            }}
          >
            ✓
          </div>

          <h2
            style={{
              fontSize: "36px",
              color: "#1f1f1f",
              marginBottom: "12px",
            }}
          >
            Order Placed Successfully!
          </h2>

          <p
            style={{
              fontSize: "16px",
              color: "#5c5146",
              marginBottom: "24px",
            }}
          >
            Thank you for your purchase. Your order has been received.
          </p>

          <Link to="/shop" style={{ textDecoration: "none" }}>
            <button
              style={{
                background: "#111",
                color: "#fff",
                border: "none",
                padding: "12px 24px",
                fontSize: "15px",
                cursor: "pointer",
              }}
            >
              Continue Shopping
            </button>
          </Link>
        </section>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main
        style={{
          background: "#f3f0ea",
          minHeight: "100vh",
          padding: "40px 0",
        }}
      >
        <section
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            background: "#fff",
            border: "1px solid #ddd5ca",
            padding: "80px 40px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: "36px",
              color: "#1f1f1f",
              marginBottom: "12px",
            }}
          >
            Your Cart is Empty
          </h2>

          <p
            style={{
              fontSize: "16px",
              color: "#5c5146",
              marginBottom: "24px",
            }}
          >
            Add some items to your cart before checking out.
          </p>

          <Link to="/shop" style={{ textDecoration: "none" }}>
            <button
              style={{
                background: "#111",
                color: "#fff",
                border: "none",
                padding: "12px 24px",
                fontSize: "15px",
                cursor: "pointer",
              }}
            >
              Start Shopping
            </button>
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main
      style={{
        background: "#f3f0ea",
        minHeight: "100vh",
        padding: "40px 0",
      }}
    >
      <section
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          background: "#fff",
          border: "1px solid #ddd5ca",
          padding: "40px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h1
            style={{
              fontSize: "40px",
              color: "#1f1f1f",
              marginBottom: "10px",
            }}
          >
            Complete Your Order
          </h1>
          <p
            style={{
              fontSize: "16px",
              color: "#5c5146",
            }}
          >
            Review your items and finalize checkout.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr",
            gap: "28px",
          }}
        >
          <div
            style={{
              background: "#faf8f4",
              border: "1px solid #e5ddd2",
              padding: "30px",
            }}
          >
            <h3
              style={{
                fontSize: "28px",
                color: "#1f1f1f",
                marginBottom: "20px",
              }}
            >
              Delivery Information
            </h3>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "16px" }}>
                <label
                  htmlFor="name"
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "600",
                  }}
                >
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  disabled={submitting}
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

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                  marginBottom: "16px",
                }}
              >
                <div>
                  <label
                    htmlFor="email"
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontWeight: "600",
                    }}
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    disabled={submitting}
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

                <div>
                  <label
                    htmlFor="phone"
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontWeight: "600",
                    }}
                  >
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    disabled={submitting}
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
              </div>

              <div style={{ marginBottom: "24px" }}>
                <label
                  htmlFor="address"
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "600",
                  }}
                >
                  Delivery Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  rows="4"
                  value={form.address}
                  onChange={handleChange}
                  disabled={submitting}
                  required
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #d9d0c4",
                    background: "#fff",
                    fontSize: "15px",
                    resize: "vertical",
                  }}
                />
              </div>

              <div style={{ marginBottom: "24px" }}>
                <h3
                  style={{
                    fontSize: "26px",
                    color: "#1f1f1f",
                    marginBottom: "16px",
                  }}
                >
                  Payment Method
                </h3>

                <div style={{ display: "grid", gap: "14px" }}>
                  <label
                    style={{
                      border:
                        paymentMethod === "esewa"
                          ? "2px solid #111"
                          : "1px solid #ddd5ca",
                      background: "#fff",
                      padding: "16px",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="esewa"
                      checked={paymentMethod === "esewa"}
                      onChange={() => handlePaymentMethodChange("esewa")}
                      disabled={submitting}
                    />{" "}
                    <strong>eSewa</strong> – Pay securely with eSewa digital
                    wallet
                  </label>

                  <label
                    style={{
                      border:
                        paymentMethod === "khalti"
                          ? "2px solid #111"
                          : "1px solid #ddd5ca",
                      background: "#fff",
                      padding: "16px",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="khalti"
                      checked={paymentMethod === "khalti"}
                      onChange={() => handlePaymentMethodChange("khalti")}
                      disabled={submitting}
                    />{" "}
                    <strong>Khalti</strong> – Pay using Khalti mobile wallet
                  </label>

                  <label
                    style={{
                      border:
                        paymentMethod === "cod"
                          ? "2px solid #111"
                          : "1px solid #ddd5ca",
                      background: "#fff",
                      padding: "16px",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => handlePaymentMethodChange("cod")}
                      disabled={submitting}
                    />{" "}
                    <strong>Cash on Delivery</strong> – Pay when your order
                    arrives
                  </label>
                </div>

                {paymentError && (
                  <div
                    style={{
                      marginTop: "14px",
                      padding: "12px",
                      background: "#fff4f4",
                      border: "1px solid #e3bcbc",
                      color: "#a32020",
                      fontSize: "14px",
                    }}
                  >
                    {paymentError}
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={submitting}
                style={{
                  width: "100%",
                  background: "#111",
                  color: "#fff",
                  border: "none",
                  padding: "14px 20px",
                  fontSize: "15px",
                  cursor: "pointer",
                }}
              >
                {submitting
                  ? "Processing..."
                  : paymentMethod === "cod"
                    ? `Place Order - Rs ${getTotalPrice().toLocaleString()}`
                    : `Pay Rs ${getTotalPrice().toLocaleString()} with ${
                        paymentMethod === "esewa" ? "eSewa" : "Khalti"
                      }`}
              </button>
            </form>
          </div>

          <div
            style={{
              background: "#111",
              color: "#fff",
              padding: "30px",
              height: "fit-content",
            }}
          >
            <h3
              style={{
                fontSize: "28px",
                marginBottom: "20px",
              }}
            >
              Order Summary
            </h3>

            <div style={{ display: "grid", gap: "14px", marginBottom: "20px" }}>
              {cart.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "14px",
                    borderBottom: "1px solid #2a2a2a",
                    paddingBottom: "12px",
                  }}
                >
                  <div>
                    <p style={{ marginBottom: "4px" }}>{item.name}</p>
                    <p style={{ color: "#ccc", fontSize: "14px" }}>
                      Qty: {item.qty || 1}
                    </p>
                  </div>
                  <p>
                    Rs {((item.price || 0) * (item.qty || 1)).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: "12px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                  color: "#ddd",
                }}
              >
                <span>Subtotal</span>
                <span>Rs {getTotalPrice().toLocaleString()}</span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                  color: "#ddd",
                }}
              >
                <span>Shipping</span>
                <span>FREE</span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "16px",
                  color: "#ddd",
                }}
              >
                <span>Tax</span>
                <span>Rs 0</span>
              </div>
            </div>

            <div
              style={{
                borderTop: "1px solid #2a2a2a",
                paddingTop: "16px",
                display: "flex",
                justifyContent: "space-between",
                fontSize: "22px",
                fontWeight: "700",
                marginBottom: "20px",
              }}
            >
              <span>Total</span>
              <span>Rs {getTotalPrice().toLocaleString()}</span>
            </div>

            <Link
              to="/cart"
              style={{
                color: "#d4a017",
                textDecoration: "none",
                fontSize: "15px",
              }}
            >
              ← Edit Cart
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Checkout;