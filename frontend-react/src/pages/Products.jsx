import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import apiClient from "../api/client";

const RAW_API_BASE_URL =
  import.meta?.env?.VITE_API_URL ||
  "https://jubilant-simplicity-production-33e3.up.railway.app/api";
const IMAGE_BASE_URL = RAW_API_BASE_URL.replace(/\/api\/?$/, "").replace(/\/+$/, "");

const Products = ({
  category,
  title,
  showHeader = true,
  sort,
  priceRange,
  search,
}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    loadProducts();
  }, [category, sort, priceRange, search]);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://via.placeholder.com/300x300";

    if (imagePath.startsWith("http")) {
      return imagePath;
    }

    return `${IMAGE_BASE_URL}${imagePath}`;
  };

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getAllProducts();
      let filteredProducts = response.data || [];

      if (search && search.trim()) {
        const searchLower = search.toLowerCase().trim();
        filteredProducts = filteredProducts.filter((p) => {
          const name = (p.name || "").toLowerCase();
          const description = (p.description || "").toLowerCase();
          const cat = (p.category || "").toLowerCase();

          return (
            name.includes(searchLower) ||
            description.includes(searchLower) ||
            cat.includes(searchLower)
          );
        });
      }

      if (category) {
        if (Array.isArray(category)) {
          if (category.length > 0) {
            filteredProducts = filteredProducts.filter((p) =>
              category.some((cat) =>
                (p.category || "").toLowerCase().includes(cat.toLowerCase()),
              ),
            );
          }
        } else if (category !== "") {
          filteredProducts = filteredProducts.filter((p) =>
            (p.category || "").toLowerCase().includes(category.toLowerCase()),
          );
        }
      }

      if (priceRange) {
        const parts = priceRange.split("-").map((v) => parseFloat(v));
        if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
          const [min, max] = parts;
          filteredProducts = filteredProducts.filter((p) => {
            const price = parseFloat(p.price) || 0;
            return price >= min && price <= max;
          });
        }
      }

      if (sort === "low-high") {
        filteredProducts.sort(
          (a, b) => (parseFloat(a.price) || 0) - (parseFloat(b.price) || 0),
        );
      } else if (sort === "high-low") {
        filteredProducts.sort(
          (a, b) => (parseFloat(b.price) || 0) - (parseFloat(a.price) || 0),
        );
      }

      const productsWithImages = await Promise.all(
        filteredProducts.map(async (product) => {
          try {
            const imagesResponse = await apiClient.getProductImages(product.id);
            const images = imagesResponse.data || [];

            return {
              ...product,
              image:
                images.length > 0
                  ? getImageUrl(images[0].image_path)
                  : "https://via.placeholder.com/300x300",
            };
          } catch {
            return {
              ...product,
              image: "https://via.placeholder.com/300x300",
            };
          }
        }),
      );

      setProducts(productsWithImages);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    const loggedInUser = localStorage.getItem("user");

    if (!loggedInUser) {
      alert("Please login first to add products to cart.");
      navigate("/login");
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: product.quantity,
    });

    alert(`${product.name} added to cart!`);
  };

  return (
    <main style={{ minHeight: "70vh" }}>
      {showHeader && (
        <section
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            background: "#f3f0ea",
            padding: "40px",
            border: "1px solid #ddd5ca",
            borderBottom: "none",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <h2
              style={{
                fontSize: "36px",
                marginBottom: "10px",
                color: "#1f1f1f",
              }}
            >
              {title || "Products"}
            </h2>
            <p
              style={{
                fontSize: "16px",
                color: "#5c5146",
              }}
            >
              Browse our collection
            </p>
          </div>
        </section>
      )}

      <section
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          background: "#fff",
          padding: "40px",
          border: "1px solid #ddd5ca",
        }}
      >
        {loading ? (
          <p style={{ textAlign: "center", padding: "40px", fontSize: "18px" }}>
            Loading products...
          </p>
        ) : products.length === 0 ? (
          <p style={{ textAlign: "center", padding: "40px", fontSize: "18px" }}>
            No products found in this category.
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "25px",
            }}
          >
            {products.map((product) => {
              const stock = Number(product.quantity || 0);
              const isOutOfStock = stock <= 0;

              return (
                <article
                  key={product.id}
                  style={{
                    background: "#faf8f4",
                    border: "1px solid #e5ddd2",
                    padding: "18px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "220px",
                      background: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                      marginBottom: "14px",
                      border: "1px solid #ece6dc",
                    }}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/300x300";
                      }}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </div>

                  <div
                    style={{
                      display: "inline-block",
                      background: "#111",
                      color: "#fff",
                      padding: "6px 12px",
                      fontSize: "12px",
                      marginBottom: "12px",
                    }}
                  >
                    {product.category || "Product"}
                  </div>

                  <h3
                    style={{
                      fontSize: "22px",
                      marginBottom: "10px",
                      color: "#1f1f1f",
                    }}
                  >
                    {product.name}
                  </h3>

                  <p
                    style={{
                      fontSize: "15px",
                      color: "#666",
                      lineHeight: "1.7",
                      minHeight: "52px",
                      marginBottom: "10px",
                    }}
                  >
                    {product.description || "Quality kitchen and household product"}
                  </p>

                  <p
                    style={{
                      fontSize: "14px",
                      color: isOutOfStock ? "#a32020" : "#1f7a3d",
                      fontWeight: "700",
                      marginBottom: "14px",
                    }}
                  >
                    {isOutOfStock ? "Out of Stock" : `In Stock: ${stock} pcs`}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "12px",
                      marginTop: "10px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "18px",
                        fontWeight: "700",
                        color: "#7a4b21",
                      }}
                    >
                      Rs {parseFloat(product.price || 0).toFixed(0)}
                    </span>

                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={isOutOfStock}
                      style={{
                        background: isOutOfStock ? "#999" : "#111",
                        color: "#fff",
                        border: "none",
                        padding: "10px 16px",
                        cursor: isOutOfStock ? "not-allowed" : "pointer",
                        fontSize: "14px",
                      }}
                    >
                      {isOutOfStock ? "Unavailable" : "Add to Cart"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
};

export default Products;
