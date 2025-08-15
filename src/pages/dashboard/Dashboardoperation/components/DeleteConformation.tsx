import React from "react";
import type { DeleteConfirmationProps } from "../DashboardoperationInterface";
import { FiX, FiTrash2 } from "react-icons/fi";

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
  deleteId,
  onCancel,
  onConfirm,
}) => {
  if (!deleteId) return null; // don't render if nothing to delete

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
      <div className="bg-white rounded-xl p-6 shadow-xl w-full max-w-sm animate-fadeIn">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700">
            Confirm Delete
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            <FiX size={24} />
          </button>
        </div>

        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this expense? This action cannot be
          undone.
        </p>

        <div className="flex justify-center gap-3">
          <button
            className="flex items-center gap-2 px-5 py-2 border rounded-lg text-gray-600 hover:bg-gray-100 transition-all duration-200"
            onClick={onCancel}
          >
            <FiX /> Cancel
          </button>
          <button
            className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg shadow-md hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg"
            onClick={() => onConfirm(deleteId)}
          >
            <FiTrash2 /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
