import React from "react";

const Contact = () => {
  return (
    <main style={{ background: "#f3f0ea", minHeight: "100vh", padding: "40px 0" }}>
      <section
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          background: "#fff",
          padding: "50px 40px",
          border: "1px solid #ddd5ca",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1
            style={{
              fontSize: "42px",
              marginBottom: "14px",
              color: "#1f1f1f",
            }}
          >
            Contact Baragar Traders
          </h1>
          <p
            style={{
              maxWidth: "820px",
              margin: "0 auto",
              fontSize: "17px",
              lineHeight: "1.7",
              color: "#5c5146",
            }}
          >
            Have questions about our kitchen utensils, traditional Nepali
            metalware, or household products? We are here to help you.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr",
            gap: "28px",
          }}
        >
          <form
            style={{
              background: "#faf8f4",
              border: "1px solid #e5ddd2",
              padding: "30px",
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
              Contact Us
            </div>

            <h3
              style={{
                fontSize: "30px",
                marginBottom: "20px",
                color: "#1f1f1f",
              }}
            >
              Send Us a Message
            </h3>

            <div style={{ marginBottom: "16px" }}>
              <label
                htmlFor="c-name"
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "600",
                  color: "#333",
                }}
              >
                Full Name
              </label>
              <input
                id="c-name"
                type="text"
                placeholder="Your full name"
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
                htmlFor="c-email"
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
                id="c-email"
                type="email"
                placeholder="you@example.com"
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
                htmlFor="c-type"
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "600",
                  color: "#333",
                }}
              >
                Message Type
              </label>
              <select
                id="c-type"
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #d9d0c4",
                  background: "#fff",
                  fontSize: "15px",
                }}
              >
                <option>General inquiry</option>
                <option>Product availability</option>
                <option>Bulk order</option>
                <option>Delivery information</option>
                <option>Website issue</option>
              </select>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label
                htmlFor="c-message"
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "600",
                  color: "#333",
                }}
              >
                Message
              </label>
              <textarea
                id="c-message"
                rows={6}
                placeholder="Write your message here..."
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

            <button
              type="submit"
              style={{
                background: "#111",
                color: "#fff",
                border: "none",
                padding: "12px 22px",
                fontSize: "15px",
                cursor: "pointer",
              }}
            >
              Send Message
            </button>

            <p
              style={{
                marginTop: "14px",
                fontSize: "14px",
                color: "#777",
                lineHeight: "1.7",
              }}
            >
              This is a demo contact form. You can connect it with your backend
              later to save or send messages.
            </p>
          </form>

          <aside
            style={{
              background: "#111",
              color: "#fff",
              padding: "30px",
            }}
          >
            <div
              style={{
                display: "inline-block",
                background: "#d4a017",
                color: "#111",
                padding: "6px 12px",
                fontSize: "13px",
                marginBottom: "14px",
                fontWeight: "600",
              }}
            >
              Get In Touch
            </div>

            <h3
              style={{
                fontSize: "30px",
                marginBottom: "20px",
              }}
            >
              Our Details
            </h3>

            <p style={{ marginBottom: "14px", lineHeight: "1.8", color: "#ddd" }}>
              <strong style={{ color: "#fff" }}>Location:</strong> Dhangadhi,
              Nepal
            </p>

            <p style={{ marginBottom: "14px", lineHeight: "1.8", color: "#ddd" }}>
              <strong style={{ color: "#fff" }}>Email:</strong>{" "}
              hello@baragartraders.com
            </p>

            <p style={{ marginBottom: "14px", lineHeight: "1.8", color: "#ddd" }}>
              <strong style={{ color: "#fff" }}>Phone:</strong> +977 9856433456
            </p>

            <p style={{ marginBottom: "20px", lineHeight: "1.8", color: "#ddd" }}>
              <strong style={{ color: "#fff" }}>Landline:</strong> +01-4423244
            </p>

            <div style={{ marginBottom: "22px" }}>
              <h4 style={{ marginBottom: "10px", fontSize: "20px" }}>Business Hours</h4>
              <p style={{ color: "#ddd", lineHeight: "1.8" }}>
                Sunday – Friday
                <br />
                9:00 AM – 6:00 PM
              </p>
            </div>

            <div style={{ marginBottom: "22px" }}>
              <h4 style={{ marginBottom: "10px", fontSize: "20px" }}>FAQ</h4>
              <div style={{ color: "#ddd", lineHeight: "1.8", fontSize: "15px" }}>
                <p style={{ marginBottom: "12px" }}>
                  <strong style={{ color: "#fff" }}>
                    Do you have traditional Nepali utensils?
                  </strong>
                  <br />
                  Yes, we offer copper, brass, kasa, pital, and other
                  traditional utensils.
                </p>

                <p style={{ marginBottom: "12px" }}>
                  <strong style={{ color: "#fff" }}>
                    Do you sell electronic kitchen items?
                  </strong>
                  <br />
                  Yes, we also provide rice cookers, mixers, grinders, and
                  similar products.
                </p>

                <p>
                  <strong style={{ color: "#fff" }}>
                    Can I ask for bulk orders?
                  </strong>
                  <br />
                  Yes, you can contact us directly for bulk purchases and
                  business inquiries.
                </p>
              </div>
            </div>

            <p style={{ color: "#c9c9c9", lineHeight: "1.7", fontSize: "14px" }}>
              We are always ready to help customers choose the right kitchen and
              household products.
            </p>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default Contact;