import React from "react";

const Modal = ({ title, children, onClose, show }) => {
  if (!show) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      onClick={handleOverlayClick}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.72)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        padding: "20px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "560px",
          background: "#1c1c1c",
          color: "#ffffff",
          border: "1px solid #353535",
          borderRadius: "8px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
          padding: "24px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "18px",
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: "22px",
              color: "#ffffff",
            }}
          >
            {title}
          </h3>

          <button
            onClick={onClose}
            type="button"
            style={{
              background: "transparent",
              border: "none",
              color: "#ffffff",
              fontSize: "24px",
              lineHeight: 1,
              cursor: "pointer",
            }}
          >
            ×
          </button>
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;