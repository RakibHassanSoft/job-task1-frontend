import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import type { ExpenseTableProps } from "../DashboardoperationInterface";




const categoryColors: Record<string, string> = {
  Food: "bg-green-100 text-green-800",
  Transport: "bg-blue-100 text-blue-800",
  Shopping: "bg-yellow-100 text-yellow-800",
  Others: "bg-gray-100 text-gray-800",
};

const ExpenseTable: React.FC<ExpenseTableProps> = ({
  expenses,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border rounded-lg shadow-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Title</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Amount</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Category</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Date</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((exp) => (
            <tr key={exp._id} className="hover:bg-gray-50 transition">
              <td className="py-3 px-4 border-b">{exp.title}</td>
              <td className="py-3 px-4 border-b font-medium text-green-600">
                ${exp.amount}
              </td>
              <td className="py-3 px-4 border-b">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    categoryColors[exp.category] || "bg-gray-100 text-gray-800"
                  }`}
                >
                  {exp.category}
                </span>
              </td>
              <td className="py-3 px-4 border-b">
                {new Date(exp.date).toLocaleDateString()}
              </td>
              <td className="py-3 px-4 border-b flex gap-2">
                <button
                  className="flex items-center gap-1 px-3 py-1 border rounded text-blue-600 hover:bg-blue-50"
                  onClick={() => onEdit(exp)}
                >
                  <FiEdit /> Edit
                </button>
                <button
                  className="flex items-center gap-1 px-3 py-1 border rounded text-red-600 hover:bg-red-50"
                  onClick={() => onDelete(exp._id)}
                >
                  <FiTrash2 /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTable;
