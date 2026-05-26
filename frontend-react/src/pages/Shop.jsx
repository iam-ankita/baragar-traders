import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Products from "./Products";

const Shop = () => {
  const [searchParams] = useSearchParams();
  const [showCategories, setShowCategories] = useState(true);
  const [showPrices, setShowPrices] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const query = searchParams.get("search") || "";
    setSearchQuery(query);
  }, [searchParams]);

  const selectCategory = (e) => setSelectedCategory(e.target.value);
  const selectPriceRange = (e) => setSelectedPriceRange(e.target.value);
  const changeSort = (e) => setSortOption(e.target.value);
  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  return (
    <main>
      <div className="container">
        <aside className="sidebar">
          <div className="filter-box">
            <div
              className="filter-header"
              onClick={() => setShowCategories(!showCategories)}
            >
              <h3>Categories</h3>
              <span className="toggle">{showCategories ? "−" : "+"}</span>
            </div>

            {showCategories && (
              <div className="filter-content">
                <label>
                  <input
                    type="radio"
                    name="category"
                    value=""
                    onChange={selectCategory}
                    checked={selectedCategory === ""}
                  />{" "}
                  All Categories
                </label>

                <label>
                  <input
                    type="radio"
                    name="category"
                    value="Steel Items"
                    onChange={selectCategory}
                    checked={selectedCategory === "Steel Items"}
                  />{" "}
                  Steel Items
                </label>

                

                <label>
                  <input
                    type="radio"
                    name="category"
                    value="Kasa"
                    onChange={selectCategory}
                    checked={selectedCategory === "Kasa"}
                  />{" "}
                  Kasa
                </label>

                <label>
                  <input
                    type="radio"
                    name="category"
                    value="Tama"
                    onChange={selectCategory}
                    checked={selectedCategory === "Tama"}
                  />{" "}
                  Tama
                </label>

                <label>
                  <input
                    type="radio"
                    name="category"
                    value="Pital"
                    onChange={selectCategory}
                    checked={selectedCategory === "Pital"}
                  />{" "}
                  Pital
                </label>

                <label>
                  <input
                    type="radio"
                    name="category"
                    value="Electronic Items"
                    onChange={selectCategory}
                    checked={selectedCategory === "Electronic Items"}
                  />{" "}
                  Electronic Items
                </label>
              </div>
            )}
          </div>

          <div className="filter-box">
            <div
              className="filter-header"
              onClick={() => setShowPrices(!showPrices)}
            >
              <h3>Price Filter</h3>
              <span className="toggle">{showPrices ? "−" : "+"}</span>
            </div>

            {showPrices && (
              <div className="filter-content">
                <label>
                  <input
                    type="radio"
                    name="price"
                    value=""
                    onChange={selectPriceRange}
                    checked={selectedPriceRange === ""}
                  />{" "}
                  All
                </label>

                <label>
                  <input
                    type="radio"
                    name="price"
                    value="0-2000"
                    onChange={selectPriceRange}
                    checked={selectedPriceRange === "0-2000"}
                  />{" "}
                  ₹0 – ₹2,000
                </label>

                <label>
                  <input
                    type="radio"
                    name="price"
                    value="2000-5000"
                    onChange={selectPriceRange}
                    checked={selectedPriceRange === "2000-5000"}
                  />{" "}
                  ₹2,000 – ₹5,000
                </label>

                <label>
                  <input
                    type="radio"
                    name="price"
                    value="5000-10000"
                    onChange={selectPriceRange}
                    checked={selectedPriceRange === "5000-10000"}
                  />{" "}
                  ₹5,000 – ₹10,000
                </label>

                <label>
                  <input
                    type="radio"
                    name="price"
                    value="10000-50000"
                    onChange={selectPriceRange}
                    checked={selectedPriceRange === "10000-50000"}
                  />{" "}
                  ₹10,000 and above
                </label>
              </div>
            )}
          </div>
        </aside>

        <section className="content">
          <div className="page-header">
            <h2>
              {searchQuery ? `Search: "${searchQuery}"` : "Shop All Products"}
            </h2>
            <p className="subtitle">
              {searchQuery
                ? "Showing results for your search"
                : "Discover premium Baragar Traders products for your home and kitchen."}
            </p>
          </div>

          <div className="toolbar">
            <div className="search-filter">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="shop-search-input"
              />
            </div>

            <select id="sortSelect" value={sortOption} onChange={changeSort}>
              <option value="default">Default sorting</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
          </div>

          <Products
            category={selectedCategory}
            priceRange={selectedPriceRange}
            sort={sortOption}
            search={searchQuery}
            title="Shop All Products"
            showHeader={false}
          />
        </section>
      </div>
    </main>
  );
};

export default Shop;