import React from "react";
import type { DeleteConfirmationProps } from "../DashboardoperationInterface";



const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
  deleteId,
  onCancel,
  onConfirm,
}) => {
  if (!deleteId) return null; // don't render if nothing to delete

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
      <div className="bg-white rounded-xl p-6 shadow-lg w-full max-w-sm">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Confirm Delete
        </h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this expense? This action cannot be
          undone.
        </p>
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 border rounded hover:bg-gray-100"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 border rounded bg-red-600 text-white hover:bg-red-700"
            onClick={() => onConfirm(deleteId)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
