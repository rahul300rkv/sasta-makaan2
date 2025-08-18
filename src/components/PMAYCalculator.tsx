import React from "react";

interface PopupProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Popup: React.FC<PopupProps> = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div
      style={{
        position: "fixed",
        zIndex: 1000,
        left: 0,
        top: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClose} // Close when backdrop clicked
    >
      <div
        style={{
          background: "white",
          padding: 24,
          borderRadius: 8,
          minWidth: 350,
        }}
        onClick={e => e.stopPropagation()} // Don't close on modal click
      >
        {children}
      </div>
    </div>
  );
};

export default Popup;
