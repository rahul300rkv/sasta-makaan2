import React from 'react';
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
      <div className="bg-white rounded-xl p-6 shadow-xl min-w-[350px] max-w-[95vw]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg">{title}</h3>
          <button onClick={onClose} className="text-lg">&times;</button>
        </div>
        {children}
      </div>
    </div>
  );
};
export default Modal;