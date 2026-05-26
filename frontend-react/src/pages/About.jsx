import React from "react";

const About = () => {
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
        <div style={{ textAlign: "center", marginBottom: "45px" }}>
          <h1
            style={{
              fontSize: "42px",
              marginBottom: "14px",
              color: "#1f1f1f",
            }}
          >
            About Baragar Traders
          </h1>
          <p
            style={{
              maxWidth: "850px",
              margin: "0 auto",
              fontSize: "17px",
              lineHeight: "1.7",
              color: "#5c5146",
            }}
          >
            A trusted kitchen utensils and household store bringing traditional
            Nepali metalware and modern kitchen essentials to every home.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "30px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              background: "#faf8f4",
              padding: "30px",
              border: "1px solid #e5ddd2",
            }}
          >
            <h2
              style={{
                fontSize: "30px",
                marginBottom: "18px",
                color: "#1f1f1f",
              }}
            >
              Who We Are
            </h2>

            <p style={{ fontSize: "16px", lineHeight: "1.8", marginBottom: "16px", color: "#444" }}>
              <strong>Baragar Traders</strong> is a kitchen and household store
              located in <strong>Dhangadhi, Nepal</strong>. Our shop is known
              for providing quality utensils and useful kitchen products for
              daily home use from past 15 years.
            </p>

            <p style={{ fontSize: "16px", lineHeight: "1.8", marginBottom: "16px", color: "#444" }}>
              We offer both <strong>traditional Nepali metal products</strong>{" "}
              and <strong>modern kitchen items</strong>. From copper, brass,
              kasa, pital, and steel utensils to electronic kitchen appliances,
              we aim to provide products that are practical, durable, and
              beautiful.
            </p>

            <p style={{ fontSize: "16px", lineHeight: "1.8", marginBottom: "22px", color: "#444" }}>
              Under the guidance of <strong>Hem Raj Pant</strong>, Baragar
              Traders focuses on customer trust, product quality, and useful
              items for every kitchen. Our goal is to serve customers with good
              products at fair prices while preserving the value of traditional
              Nepali utensils.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "18px",
              }}
            >
              <div
                style={{
                  background: "#fff",
                  padding: "18px",
                  border: "1px solid #e5ddd2",
                }}
              >
                <h4 style={{ marginBottom: "10px", fontSize: "18px", color: "#1f1f1f" }}>
                  Quality Products
                </h4>
                <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#555" }}>
                  We provide durable kitchen utensils and household items that
                  are suitable for regular family use.
                </p>
              </div>

              <div
                style={{
                  background: "#fff",
                  padding: "18px",
                  border: "1px solid #e5ddd2",
                }}
              >
                <h4 style={{ marginBottom: "10px", fontSize: "18px", color: "#1f1f1f" }}>
                  Traditional &amp; Modern
                </h4>
                <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#555" }}>
                  Our collection includes both classic Nepali metalware and
                  modern kitchen appliances.
                </p>
              </div>

              <div
                style={{
                  background: "#fff",
                  padding: "18px",
                  border: "1px solid #e5ddd2",
                }}
              >
                <h4 style={{ marginBottom: "10px", fontSize: "18px", color: "#1f1f1f" }}>
                  Customer Trust
                </h4>
                <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#555" }}>
                  We believe in honest service, fair pricing, and long-term
                  customer satisfaction.
                </p>
              </div>
            </div>
          </div>

          <aside
            style={{
              background: "#111",
              color: "#fff",
              padding: "30px",
            }}
          >
            <h3 style={{ fontSize: "28px", marginBottom: "18px" }}>
              Our Main Categories
            </h3>

            <ul style={{ paddingLeft: "18px", lineHeight: "1.9", fontSize: "15px" }}>
              <li>
                <strong>Steel Items</strong> – plates, bowls, glasses, kitchen
                sets
              </li>
              <li>
                <strong>Nepali Hulas</strong> – traditional utensils and useful
                household items
              </li>
              <li>
                <strong>Kasa</strong> – Nepali brass-based utensils and serving
                items
              </li>
              <li>
                <strong>Tama</strong> – copper utensils and decorative kitchen
                pieces
              </li>
              <li>
                <strong>Pital</strong> – brass items for home and kitchen use
              </li>
              <li>
                <strong>Electronic Items</strong> – rice cookers, mixers,
                grinders, and more
              </li>
            </ul>

            <p
              style={{
                marginTop: "20px",
                fontSize: "15px",
                lineHeight: "1.8",
                color: "#d8d8d8",
              }}
            >
              Baragar Traders combines usefulness, tradition, and quality in one
              place for every customer.
            </p>
          </aside>
        </div>

        <section style={{ marginBottom: "40px" }}>
          <div style={{ textAlign: "center", marginBottom: "28px" }}>
            <h2 style={{ fontSize: "34px", marginBottom: "10px", color: "#1f1f1f" }}>
              Our Mission, Vision &amp; Values
            </h2>
            <p style={{ fontSize: "16px", color: "#666" }}>
              Built on trust, quality, and service for every household.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "22px",
            }}
          >
            <article
              style={{
                background: "#faf8f4",
                border: "1px solid #e5ddd2",
                padding: "25px",
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
                Mission
              </div>
              <h3 style={{ fontSize: "24px", marginBottom: "12px", color: "#1f1f1f" }}>
                Serve Every Kitchen
              </h3>
              <p style={{ fontSize: "15px", lineHeight: "1.8", color: "#555" }}>
                To provide reliable kitchen utensils, metalware, and appliances
                that make daily household work easier and better.
              </p>
            </article>

            <article
              style={{
                background: "#faf8f4",
                border: "1px solid #e5ddd2",
                padding: "25px",
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
                Vision
              </div>
              <h3 style={{ fontSize: "24px", marginBottom: "12px", color: "#1f1f1f" }}>
                Trusted Household Store 
              </h3>
              <p style={{ fontSize: "15px", lineHeight: "1.8", color: "#555" }}>
                To become a trusted name for kitchen and household products in
                Dhangadhi and beyond through quality and honest service.
              </p>
            </article>

            <article
              style={{
                background: "#faf8f4",
                border: "1px solid #e5ddd2",
                padding: "25px",
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
                Values
              </div>
              <h3 style={{ fontSize: "24px", marginBottom: "12px", color: "#1f1f1f" }}>
                Honest &amp; Practical
              </h3>
              <p style={{ fontSize: "15px", lineHeight: "1.8", color: "#555" }}>
                We value quality, fairness, customer satisfaction, and products
                that are truly useful in everyday life.
              </p>
            </article>
          </div>
        </section>

        <section>
          <div style={{ textAlign: "center", marginBottom: "28px" }}>
            <h2 style={{ fontSize: "34px", marginBottom: "10px", color: "#1f1f1f" }}>
              Why Customers Choose Us
            </h2>
            <p style={{ fontSize: "16px", color: "#666" }}>
              Simple reasons that make Baragar Traders dependable.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "20px",
            }}
          >
            <article
              style={{
                background: "#fff",
                border: "1px solid #e5ddd2",
                padding: "22px",
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
                Point 1
              </div>
              <h3 style={{ fontSize: "22px", marginBottom: "12px", color: "#1f1f1f" }}>
                Wide Product Range
              </h3>
              <p style={{ fontSize: "15px", lineHeight: "1.8", color: "#555" }}>
                Customers can find traditional utensils, daily-use kitchen
                items, and modern appliances in one place.
              </p>
            </article>

            <article
              style={{
                background: "#fff",
                border: "1px solid #e5ddd2",
                padding: "22px",
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
                Point 2
              </div>
              <h3 style={{ fontSize: "22px", marginBottom: "12px", color: "#1f1f1f" }}>
                Reliable Quality
              </h3>
              <p style={{ fontSize: "15px", lineHeight: "1.8", color: "#555" }}>
                We focus on strong, durable, and useful products that customers
                can trust for long-term use.
              </p>
            </article>

            <article
              style={{
                background: "#fff",
                border: "1px solid #e5ddd2",
                padding: "22px",
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
                Point 3
              </div>
              <h3 style={{ fontSize: "22px", marginBottom: "12px", color: "#1f1f1f" }}>
                Fair Pricing
              </h3>
              <p style={{ fontSize: "15px", lineHeight: "1.8", color: "#555" }}>
                Our aim is to provide good-value products at reasonable prices
                for families and households.
              </p>
            </article>

            <article
              style={{
                background: "#fff",
                border: "1px solid #e5ddd2",
                padding: "22px",
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
                Point 4
              </div>
              <h3 style={{ fontSize: "22px", marginBottom: "12px", color: "#1f1f1f" }}>
                Friendly Service
              </h3>
              <p style={{ fontSize: "15px", lineHeight: "1.8", color: "#555" }}>
                We try to help customers choose the right products according to
                their needs and budget.
              </p>
            </article>
          </div>
        </section>
      </section>
    </main>
  );
};

export default About;