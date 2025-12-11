import React from "react";

const LoginRequiredModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Login Required
        </h3>

        <p className="text-gray-600 mb-6">
          You need to be logged in to add fruits to your cart.
        </p>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#007E6E] text-white rounded-md hover:bg-[#006758] transition"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginRequiredModal;
