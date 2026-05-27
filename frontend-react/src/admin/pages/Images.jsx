import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import apiClient from "../../api/client";

const AdminImages = () => {
  const rawApiBaseUrl =
    import.meta?.env?.VITE_API_URL ||
    "https://jubilant-simplicity-production-33e3.up.railway.app/api";
  const imageBaseUrl = rawApiBaseUrl
    .replace(/\/api\/?$/, "")
    .replace(/\/+$/, "");

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      setLoading(true);
      const res = await apiClient.getAllImages();
      setImages(res.data || []);
    } catch (error) {
      console.error("Error loading images:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Select a file");

    const fd = new FormData();
    fd.append("image", file);

    try {
      await apiClient.uploadImage(fd);
      setFile(null);
      loadImages();
    } catch (err) {
      console.error("Upload failed", err);
    }
  };

  const deleteImage = async (id) => {
    if (!confirm("Delete this image?")) return;
    try {
      await apiClient.deleteImage(id);
      loadImages();
    } catch (err) {
      console.error("Error deleting image", err);
    }
  };

  return (
    <AdminLayout title="Images">
      <div
        style={{
          background: "#f3f0ea",
          minHeight: "100vh",
          padding: "30px",
        }}
      >
        <div
          style={{
            background: "#fff",
            border: "1px solid #ddd5ca",
            padding: "30px",
            marginBottom: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "36px",
                color: "#1f1f1f",
                margin: 0,
                marginBottom: "10px",
              }}
            >
              Manage Images
            </h2>
            <p
              style={{
                fontSize: "16px",
                color: "#5c5146",
                margin: 0,
              }}
            >
              Upload and manage product images for Baragar Traders.
            </p>
          </div>

          <form
            onSubmit={handleUpload}
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              style={{
                padding: "10px",
                border: "1px solid #d9d0c4",
                background: "#fff",
              }}
            />

            <button
              type="submit"
              style={{
                background: "#111",
                color: "#fff",
                border: "none",
                padding: "12px 18px",
                cursor: "pointer",
                fontSize: "15px",
              }}
            >
              Upload
            </button>
          </form>
        </div>

        <div
          style={{
            background: "#fff",
            border: "1px solid #ddd5ca",
            padding: "24px",
          }}
        >
          {loading ? (
            <p style={{ textAlign: "center", padding: "30px" }}>
              Loading images...
            </p>
          ) : images.length === 0 ? (
            <p style={{ textAlign: "center", padding: "30px" }}>
              No images uploaded yet.
            </p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "20px",
              }}
            >
              {images.map((img) => (
                <div
                  key={img.id}
                  style={{
                    background: "#faf8f4",
                    border: "1px solid #e5ddd2",
                    padding: "16px",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "180px",
                      background: "#fff",
                      border: "1px solid #ece6dc",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                      marginBottom: "12px",
                    }}
                  >
                    <img
                      src={img.image_path ? `${imageBaseUrl}${img.image_path}` : ""}
                      alt="Uploaded"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </div>

                  <p
                    style={{
                      fontSize: "14px",
                      color: "#555",
                      marginBottom: "14px",
                      wordBreak: "break-all",
                    }}
                  >
                    {img.image_path}
                  </p>

                  <button
                    type="button"
                    onClick={() => deleteImage(img.id)}
                    style={{
                      background: "#a32020",
                      color: "#fff",
                      border: "none",
                      padding: "10px 16px",
                      cursor: "pointer",
                      fontSize: "14px",
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminImages;
