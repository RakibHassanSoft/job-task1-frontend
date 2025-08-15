import React from "react";
import type { Props } from "../DashboardoperationInterface";


const EditExpenseModal: React.FC<Props> = ({
  form,
  setForm,
  categories,
  onClose,
  onSave,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
      <div className="bg-white rounded-xl p-6 shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Edit Expense
        </h2>
        <div className="space-y-3">
          <input
            className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-400"
            placeholder="Title"
            value={form.title || ""}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <input
            className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-400"
            type="number"
            placeholder="Amount"
            value={form.amount || ""}
            onChange={(e) =>
              setForm({ ...form, amount: parseFloat(e.target.value) })
            }
          />
          <select
            className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-400"
            value={form.category || ""}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <input
            className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-400"
            type="date"
            value={
              form.date ? new Date(form.date).toISOString().split("T")[0] : ""
            }
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
          <div className="flex justify-end gap-2 mt-4">
            <button
              className="px-4 py-2 border rounded hover:bg-gray-100"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 border rounded bg-blue-600 text-white hover:bg-blue-700"
              onClick={onSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditExpenseModal;
