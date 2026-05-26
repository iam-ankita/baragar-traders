import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import apiClient from "../../api/client";
import Modal from "../components/Modal";
import Confirm from "../components/Confirm";

const initialForm = {
  username: "",
  email: "",
  phone: "",
  city: "",
};

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [confirm, setConfirm] = useState({ show: false, id: null });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const res = await apiClient.getAllUsers();
      setUsers(res.data || []);
    } catch (error) {
      console.error("Error loading users:", error);
    } finally {
      setLoading(false);
    }
  };

  const openAdd = () => {
    setEditingUserId(null);
    setForm(initialForm);
    setShowModal(true);
  };

  const openEdit = (user) => {
    setEditingUserId(user.id);
    setForm({
      username: user.username || "",
      email: user.email || "",
      phone: user.phone || "",
      city: user.city || "",
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUserId) {
        await apiClient.updateUser(editingUserId, form);
      } else {
        await apiClient.createUser(form);
      }
      setShowModal(false);
      loadUsers();
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const confirmDelete = (id) => {
    setConfirm({ show: true, id });
  };

  const doDelete = async () => {
    try {
      await apiClient.deleteUser(confirm.id);
      setConfirm({ show: false, id: null });
      loadUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <AdminLayout title="Users">
      <div
        style={{
          background: "#f3f0ea",
          minHeight: "100vh",
          padding: "30px",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            background: "#fff",
            border: "1px solid #ddd5ca",
            padding: "30px",
            marginBottom: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div>
            <h2 style={{ fontSize: "36px", marginBottom: "8px" }}>
              Manage Users
            </h2>
            <p style={{ color: "#5c5146" }}>
              View and manage all registered users.
            </p>
          </div>

          <button
            onClick={openAdd}
            style={{
              background: "#111",
              color: "#fff",
              padding: "12px 20px",
              border: "none",
              cursor: "pointer",
            }}
          >
            + Add User
          </button>
        </div>

        {/* TABLE */}
        <div
          style={{
            background: "#fff",
            border: "1px solid #ddd5ca",
            padding: "20px",
            overflowX: "auto",
          }}
        >
          {loading ? (
            <p style={{ textAlign: "center", padding: "30px" }}>
              Loading users...
            </p>
          ) : (
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                minWidth: "800px",
              }}
            >
              <thead>
                <tr style={{ background: "#111", color: "#fff" }}>
                  <th style={{ padding: "14px", textAlign: "left" }}>ID</th>
                  <th style={{ padding: "14px", textAlign: "left" }}>
                    Username
                  </th>
                  <th style={{ padding: "14px", textAlign: "left" }}>Email</th>
                  <th style={{ padding: "14px", textAlign: "left" }}>Phone</th>
                  <th style={{ padding: "14px", textAlign: "left" }}>City</th>
                  <th style={{ padding: "14px", textAlign: "left" }}>
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      style={{
                        textAlign: "center",
                        padding: "20px",
                        border: "1px solid #ddd",
                      }}
                    >
                      No users found.
                    </td>
                  </tr>
                ) : (
                  users.map((u, index) => (
                    <tr
                      key={u.id}
                      style={{
                        background: index % 2 === 0 ? "#faf8f4" : "#fff",
                      }}
                    >
                      <td style={{ padding: "14px" }}>{u.id}</td>
                      <td style={{ padding: "14px", fontWeight: "600" }}>
                        {u.username}
                      </td>
                      <td style={{ padding: "14px" }}>{u.email}</td>
                      <td style={{ padding: "14px" }}>
                        {u.phone || "-"}
                      </td>
                      <td style={{ padding: "14px" }}>
                        {u.city || "-"}
                      </td>
                      <td style={{ padding: "14px" }}>
                        <button
                          onClick={() => openEdit(u)}
                          style={{
                            background: "#111",
                            color: "#fff",
                            padding: "6px 12px",
                            border: "none",
                            marginRight: "8px",
                            cursor: "pointer",
                          }}
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => confirmDelete(u.id)}
                          style={{
                            background: "#a32020",
                            color: "#fff",
                            padding: "6px 12px",
                            border: "none",
                            cursor: "pointer",
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* MODAL */}
        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          title={editingUserId ? "Edit User" : "Add User"}
        >
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "12px" }}>
              <label>Username</label>
              <input
                required
                value={form.username}
                onChange={(e) =>
                  setForm({ ...form, username: e.target.value })
                }
                style={{ width: "100%", padding: "8px" }}
              />
            </div>

            <div style={{ marginBottom: "12px" }}>
              <label>Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                style={{ width: "100%", padding: "8px" }}
              />
            </div>

            <div style={{ marginBottom: "12px" }}>
              <label>Phone</label>
              <input
                value={form.phone}
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value })
                }
                style={{ width: "100%", padding: "8px" }}
              />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label>City</label>
              <input
                value={form.city}
                onChange={(e) =>
                  setForm({ ...form, city: e.target.value })
                }
                style={{ width: "100%", padding: "8px" }}
              />
            </div>

            <div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                style={{
                  padding: "8px 14px",
                  marginRight: "8px",
                  border: "1px solid #111",
                  background: "#fff",
                }}
              >
                Cancel
              </button>

              <button
                type="submit"
                style={{
                  padding: "8px 14px",
                  background: "#111",
                  color: "#fff",
                  border: "none",
                }}
              >
                {editingUserId ? "Save" : "Create"}
              </button>
            </div>
          </form>
        </Modal>

        <Confirm
          show={confirm.show}
          message="Are you sure you want to delete this user?"
          onConfirm={doDelete}
          onCancel={() => setConfirm({ show: false, id: null })}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;