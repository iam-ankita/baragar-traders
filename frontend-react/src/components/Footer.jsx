import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-box">
          <h4>NEWSLETTER</h4>
          <p>
            Sign up with your email to get updates about new products,
            releases and special offers.
          </p>
          <div className="newsletter">
            <input type="email" placeholder="Your email address" />
            <button>Subscribe</button>
          </div>
        </div>

        <div className="footer-box">
          <h4>QUICK LINKS</h4>
          <ul>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Terms and Conditions</a></li>
            <li><a href="#">Refund and Returns Policy</a></li>
          </ul>
        </div>

        <div className="footer-box">
          <h4>GET IN TOUCH</h4>
          <p>Dhangadhi, Nepal</p>
          <p>hello@baragartraders.com</p>
          <p>+977 9856433456</p>
          <p>+01-4423244</p>
        </div>

        <div className="footer-box">
          <h4>SECURE PAYMENTS WITH</h4>
          <div className="payment-icons">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Esewa_logo.webp/960px-Esewa_logo.webp.png"
              alt="eSewa"
            />
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0j99ZjCtg1sj_OF5dmWJT87cQekV0pvbmUQ&s"
              alt="Khalti"
            />
          </div>
          <div className="secure-lock">🔒 100% Secure Payments</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;