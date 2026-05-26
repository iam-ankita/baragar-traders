import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import apiClient from "../api/client";
import "../css/checkout.css";

const PaymentCallback = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("processing");
  const [message, setMessage] = useState("Verifying your payment...");
  const [transactionDetails, setTransactionDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
      const path = window.location.pathname;

      try {
        
        if (path.includes("/esewa/success")) {
          const data = searchParams.get("data");
          if (data) {
            const result = await apiClient.verifyEsewa(data);
            if (result.data?.transactionId) {
              await completePendingOrder("esewa", result.data.transactionId);
              setStatus("success");
              setMessage("Payment successful!");
              setTransactionDetails(result.data);
            } else {
              throw new Error("Invalid eSewa response");
            }
          } else {
            throw new Error("Missing payment data");
          }
        }
        
        else if (path.includes("/esewa/failure")) {
          setStatus("failed");
          setMessage("eSewa payment was cancelled or failed.");
        }
        
        else if (path.includes("/khalti/verify")) {
          const pidx = searchParams.get("pidx");
          const txnId = searchParams.get("transaction_id");
          const paymentStatus = searchParams.get("status");

          if (paymentStatus === "Completed" && pidx) {
            const result = await apiClient.verifyKhalti({ pidx, txnId });
            if (result.data?.status === "completed") {
              await completePendingOrder("khalti", result.data.transactionId);
              setStatus("success");
              setMessage("Payment successful!");
              setTransactionDetails(result.data);
            } else {
              throw new Error("Payment verification failed");
            }
          } else if (
            paymentStatus === "Canceled" ||
            paymentStatus === "User canceled"
          ) {
            setStatus("failed");
            setMessage("Khalti payment was cancelled.");
          } else {
            throw new Error(`Payment status: ${paymentStatus || "Unknown"}`);
          }
        }
      } catch (error) {
        console.error("Payment verification error:", error);
        setStatus("failed");
        setMessage(
          error.message ||
            "Payment verification failed. Please contact support.",
        );
      }
    };

    
    const completePendingOrder = async (paymentMethod, transactionId) => {
      const pendingOrder = localStorage.getItem("pendingOrder");
      if (pendingOrder) {
        try {
          const orderData = JSON.parse(pendingOrder);
          const orderPayload = {
            customer_name: orderData.form.name,
            customer_email: orderData.form.email,
            customer_address: orderData.form.address,
            customer_phone: orderData.form.phone,
            total_amount: orderData.totalAmount,
            payment_method: paymentMethod,
            payment_status: "completed",
            transaction_id: transactionId,
            items: orderData.cart.map((item) => ({
              product_id: item.id,
              name: item.name,
              price: item.price,
              quantity: item.qty || 1,
            })),
          };

          await apiClient.createOrder(orderPayload);

         
          localStorage.removeItem("pendingOrder");
          localStorage.setItem("cart", JSON.stringify([]));
        } catch (err) {
          console.error("Error completing order:", err);
        }
      }
    };

    verifyPayment();
  }, [searchParams]);

  
  useEffect(() => {
    if (status === "success") {
      const timer = setTimeout(() => {
        navigate("/shop");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [status, navigate]);

  return (
    <main className="checkout-page">
      <section className="checkout-success">
        <div className="success-container">
          {status === "processing" && (
            <>
              <div className="processing-icon">
                <span className="spinner large"></span>
              </div>
              <h2>Processing Payment</h2>
              <p>{message}</p>
            </>
          )}

          {status === "success" && (
            <>
              <div className="success-icon">✓</div>
              <h2>Payment Successful!</h2>
              <p>Thank you for your purchase. Your order has been confirmed.</p>
              {transactionDetails && (
                <div className="transaction-details">
                  <p>
                    <strong>Transaction ID:</strong>{" "}
                    {transactionDetails.transactionId}
                  </p>
                  <p>
                    <strong>Amount Paid:</strong> Rs{" "}
                    {transactionDetails.amount?.toLocaleString()}
                  </p>
                </div>
              )}
              <p className="order-id">Redirecting to shop in 5 seconds...</p>
              <Link to="/shop" className="btn-primary">
                Continue Shopping
              </Link>
            </>
          )}

          {status === "failed" && (
            <>
              <div className="error-icon-large">✕</div>
              <h2>Payment Failed</h2>
              <p>{message}</p>
              <div className="payment-failed-actions">
                <Link to="/checkout" className="btn-primary">
                  Try Again
                </Link>
                <Link to="/shop" className="btn-secondary">
                  Back to Shop
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default PaymentCallback;
