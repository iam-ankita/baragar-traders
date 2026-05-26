import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import apiClient from "../api/client";
import kitchenSetImg from "../images/kitchen-set.png";
import kitchenItemImg from "../images/kitchen-item.png";

import "../css/styles.css";
import "../css/footer.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await apiClient.getAllProducts();
      const list = response.data || [];

      const withImages = await Promise.all(
        list.slice(0, 4).map(async (p) => {
          try {
            const imgRes = await apiClient.getProductImages(p.id);
            const img = imgRes.data?.[0]?.image_path;
            return {
              ...p,
              image: img
                ? `http://localhost:3000${img}`
                : "https://via.placeholder.com/300x300",
            };
          } catch {
            return {
              ...p,
              image: "https://via.placeholder.com/300x300",
            };
          }
        }),
      );

      setProducts(withImages);
    } catch (err) {
      console.error("Error loading products:", err);
    }
  };

  return (
    <>
      <section className="bt-home-hero">
        <div className="bt-home-hero-content">
          <p className="bt-home-tag">ELEVATE YOUR KITCHEN</p>

          <h1>
            Elevate Your Kitchen
            <br />
            with Premium Nepali
            <br />
            Copper & Brass
          </h1>

          <p className="bt-home-sub">
            Bring home premium Nepali copper and brass utensils made with
            tradition, beauty, and lasting quality.
          </p>

          <Link to="/shop" className="bt-shop-btn">
            Shop Now
          </Link>
        </div>

        <div className="bt-home-hero-image">
          <img src={kitchenSetImg} alt="Kitchen Set" />
        </div>
      </section>

      <section className="bt-home-features">
        <div className="bt-feature-item">100% Pure Metals</div>
        <div className="bt-feature-item">Handcrafted in Nepal</div>
        <div className="bt-feature-item">Sustainable Quality</div>
      </section>

      <section className="bt-featured-section">
        <h2>Featured Products</h2>

        <div className="bt-product-grid bt-product-grid-static">
          <div className="bt-product-card">
            <div className="bt-product-image-wrap">
              <img src="/images/Copper Bowl .png" alt="Copper Bowl" />
            </div>
            <h4>Copper Bowl</h4>
            <button className="bt-add-cart-btn">Add to Cart</button>
          </div>

          <div className="bt-product-card">
            <div className="bt-product-image-wrap">
              <img src="/images/Brass Water Jug.png" alt="Brass Water Jug" />
            </div>
            <h4>Brass Water Jug</h4>
            <button className="bt-add-cart-btn">Add to Cart</button>
          </div>

          <div className="bt-product-card">
            <div className="bt-product-image-wrap">
              <img src="/images/Copper Mug.png" alt="Copper Mug" />
            </div>
            <h4>Copper Mug</h4>
            <button className="bt-add-cart-btn">Add to Cart</button>
          </div>

          <div className="bt-product-card">
            <div className="bt-product-image-wrap">
              <img
                src="/images/Brass Dinner Set.png"
                alt="Brass Dinner Set"
              />
            </div>
            <h4>Brass Dinner Set</h4>
            <button className="bt-add-cart-btn">Add to Cart</button>
          </div>
        </div>
      </section>

      <section className="bt-bottom-banner">
        <div className="bt-bottom-banner-image">
          <img src={kitchenItemImg} alt="Kitchen Item" />
        </div>

        <div className="bt-bottom-banner-text">
          <p>Timeless Kitchen Essentials</p>
          <h3>Beautiful Copper & Brass Collection</h3>
        </div>
      </section>
    </>
  );
};

export default Home;