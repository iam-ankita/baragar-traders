import React, { useState, useEffect } from "react";
import apiClient from "../../api/client";
import AdminLayout from "../components/AdminLayout";
import Modal from "../components/Modal";

const initialForm = {
  name: "",
  description: "",
  price: "",
  quantity: "",
  category: "",
};

const categoryOptions = [
  "Steel Items",
  "Nepali Hulas",
  "Kasa",
  "Tama",
  "Pital",
  "Electronic Items",
];

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getAllProducts();
      const items = response.data || [];
      setProducts(Array.isArray(items) ? items : []);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  };

  const openAdd = () => {
    setEditingId(null);
    setForm(initialForm);
    setFile(null);
    setShowModal(true);
  };

  const openEdit = (p) => {
    setEditingId(p.id);
    setForm({
      name: p.name || "",
      description: p.description || "",
      price: p.price || "",
      quantity: p.quantity || "",
      category: p.category || "",
    });
    setFile(null);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    const payload = {
      name: form.name,
      description: form.description,
      price: form.price,
      quantity: form.quantity,
      category: form.category,
    };

    if (editingId) {
      try {
        await apiClient.updateProduct(editingId, payload, file);
        setShowModal(false);
        loadProducts();
      } catch (err) {
        console.error("Error updating product", err);
        alert("Failed to update product");
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    try {
      await apiClient.createProduct(payload, file);
      setShowModal(false);
      loadProducts();
    } catch (err) {
      console.error("Error creating product", err);
      alert("Failed to create product");
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteProduct = async (id) => {
    if (!confirm("Delete this product?")) return;
    try {
      await apiClient.deleteProduct(id);
      loadProducts();
    } catch (err) {
      console.error("Error deleting product", err);
    }
  };

  return (
    <AdminLayout title="Products">
      <div style={{ padding: "24px" }}>
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #ddd",
            padding: "24px",
            marginBottom: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                marginBottom: "8px",
                fontSize: "30px",
                color: "#222",
              }}
            >
              Manage Products
            </h2>
            <p
              style={{
                margin: 0,
                color: "#666",
                fontSize: "15px",
              }}
            >
              Add, edit, and remove products.
            </p>
          </div>

          <button
            onClick={openAdd}
            style={{
              background: "#111",
              color: "#fff",
              border: "none",
              padding: "12px 18px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            + Add Product
          </button>
        </div>

        <div
          style={{
            background: "#ffffff",
            border: "1px solid #ddd",
            padding: "20px",
            overflowX: "auto",
          }}
        >
          {loading ? (
            <p style={{ textAlign: "center", padding: "30px" }}>
              Loading products...
            </p>
          ) : (
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                minWidth: "1000px",
              }}
            >
              <thead>
                <tr style={{ background: "#111" }}>
                  {[
                    "ID",
                    "Name",
                    "Category",
                    "Price",
                    "Quantity",
                    "Created",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      style={{
                        color: "#fff",
                        textAlign: "left",
                        padding: "14px",
                        fontSize: "14px",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      style={{ textAlign: "center", padding: "24px" }}
                    >
                      No products found.
                    </td>
                  </tr>
                ) : (
                  products.map((product, index) => (
                    <tr
                      key={product.id}
                      style={{
                        background: index % 2 === 0 ? "#fafafa" : "#ffffff",
                        borderBottom: "1px solid #eee",
                      }}
                    >
                      <td style={{ padding: "14px" }}>{product.id}</td>
                      <td style={{ padding: "14px", fontWeight: "600" }}>
                        {product.name}
                      </td>
                      <td style={{ padding: "14px" }}>{product.category}</td>
                      <td style={{ padding: "14px" }}>Rs {product.price}</td>
                      <td style={{ padding: "14px" }}>
                        {product.quantity ?? 0}
                      </td>
                      <td style={{ padding: "14px" }}>
                        {product.createdAt || product.created_at || "-"}
                      </td>
                      <td style={{ padding: "14px" }}>
                        <div style={{ display: "flex", gap: "10px" }}>
                          <button
                            onClick={() => openEdit(product)}
                            style={{
                              background: "#111",
                              color: "#fff",
                              border: "none",
                              padding: "8px 14px",
                              cursor: "pointer",
                            }}
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => deleteProduct(product.id)}
                            style={{
                              background: "#a32020",
                              color: "#fff",
                              border: "none",
                              padding: "8px 14px",
                              cursor: "pointer",
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>

        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          title={editingId ? "Edit Product" : "Add Product"}
        >
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "14px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  color: "#ffffff",
                  fontWeight: "600",
                }}
              >
                Product Name
              </label>
              <input
                required
                disabled={isSubmitting}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "#ffffff",
                  color: "#111111",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
            </div>

            <div style={{ marginBottom: "14px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  color: "#ffffff",
                  fontWeight: "600",
                }}
              >
                Description
              </label>
              <textarea
                disabled={isSubmitting}
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                rows={5}
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "#ffffff",
                  color: "#111111",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
            </div>

            <div style={{ marginBottom: "14px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  color: "#ffffff",
                  fontWeight: "600",
                }}
              >
                Price
              </label>
              <input
                required
                disabled={isSubmitting}
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "#ffffff",
                  color: "#111111",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
            </div>

            <div style={{ marginBottom: "14px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  color: "#ffffff",
                  fontWeight: "600",
                }}
              >
                Quantity
              </label>
              <input
                required
                disabled={isSubmitting}
                type="number"
                min="0"
                value={form.quantity}
                onChange={(e) =>
                  setForm({ ...form, quantity: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "#ffffff",
                  color: "#111111",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
            </div>

            <div style={{ marginBottom: "14px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  color: "#ffffff",
                  fontWeight: "600",
                }}
              >
                Category
              </label>
              <select
                disabled={isSubmitting}
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "#ffffff",
                  color: "#111111",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              >
                <option value="">Select Category</option>
                {categoryOptions.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  color: "#ffffff",
                  fontWeight: "600",
                }}
              >
                Product Image
              </label>
              <input
                type="file"
                accept="image/*"
                disabled={isSubmitting}
                onChange={(e) => setFile(e.target.files[0])}
                style={{
                  width: "100%",
                  padding: "10px",
                  background: "#ffffff",
                  color: "#111111",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                style={{
                  background: "#ffffff",
                  color: "#111111",
                  border: "none",
                  padding: "10px 18px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  background: "#111111",
                  color: "#ffffff",
                  border: "none",
                  padding: "10px 18px",
                  cursor: "pointer",
                }}
              >
                {editingId
                  ? isSubmitting
                    ? "Saving..."
                    : "Save"
                  : isSubmitting
                    ? "Creating..."
                    : "Create"}
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default AdminProducts;