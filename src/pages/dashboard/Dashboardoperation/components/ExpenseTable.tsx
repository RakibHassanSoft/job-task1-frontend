import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import {
  FaUtensils,
  FaShoppingCart,
  FaCarSide,
  FaEllipsisH,
} from "react-icons/fa";
import type { ExpenseTableProps } from "../DashboardoperationInterface";

const categoryStyles: Record<
  string,
  { bg: string; text: string; icon: React.ReactNode }
> = {
  Food: { bg: "bg-green-100", text: "text-green-800", icon: <FaUtensils /> },
  Transport: { bg: "bg-blue-100", text: "text-blue-800", icon: <FaCarSide /> },
  Shopping: {
    bg: "bg-yellow-100",
    text: "text-yellow-800",
    icon: <FaShoppingCart />,
  },
  Others: { bg: "bg-gray-100", text: "text-gray-800", icon: <FaEllipsisH /> },
};

const ExpenseTable: React.FC<ExpenseTableProps> = ({
  expenses,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="overflow-x-auto">
      {/* Desktop Table */}
      <table className="hidden md:table min-w-full table-fixed bg-white border rounded-lg shadow-md">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 w-1/4">
              Title
            </th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 w-1/6">
              Amount
            </th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 w-1/6">
              Category
            </th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 w-1/4">
              Date
            </th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 w-1/6">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((exp) => {
            const category =
              categoryStyles[exp.category] || categoryStyles.Others;
            return (
              <tr
                key={exp._id}
                className="bg-white mb-2 shadow-sm hover:shadow-lg transition-shadow duration-200"
              >
                <td className="py-3 px-4 border-b">{exp.title}</td>
                <td className="py-3 px-4 border-b font-medium text-green-600">
                  ${exp.amount.toFixed(2)}
                </td>
                <td className="py-3 px-4 border-b">
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${category.bg} ${category.text}`}
                  >
                    {category.icon} {exp.category}
                  </span>
                </td>
                <td className="py-3 px-4 border-b">
                  {new Date(exp.date).toLocaleDateString()}
                </td>
                <td className="py-3 px-4 border-b flex gap-2">
                  <button
                    onClick={() => onEdit(exp)}
                    className="flex items-center gap-2 px-3 py-2 bg-green-300 text-white font-medium rounded-lg shadow-md hover:bg-green-600 transition"
                  >
                    <FiEdit /> Edit
                  </button>
                  <button
                    onClick={() => onDelete(exp._id)}
                    className="flex items-center gap-2 px-3 py-2 bg-red-300 text-white font-medium rounded-lg shadow-md hover:bg-red-600 transition"
                  >
                    <FiTrash2 /> Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {expenses.map((exp) => {
          const category =
            categoryStyles[exp.category] || categoryStyles.Others;
          return (
            <div
              key={exp._id}
              className="bg-white p-4 rounded-xl shadow-md space-y-2"
            >
              <div className="flex justify-between items-center">
                <h4 className="text-lg font-semibold text-gray-800">
                  {exp.title}
                </h4>
                <span
                  className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${category.bg} ${category.text}`}
                >
                  {category.icon} {exp.category}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                Amount:{" "}
                <span className="font-medium text-green-600">
                  ${exp.amount.toFixed(2)}
                </span>
              </p>
              <p className="text-sm text-gray-600">
                Date: {new Date(exp.date).toLocaleDateString()}
              </p>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => onEdit(exp)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-300 text-white text-sm font-medium rounded-lg shadow-md hover:bg-green-600 transition"
                >
                  <FiEdit /> Edit
                </button>
                <button
                  onClick={() => onDelete(exp._id)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-300 text-white text-sm font-medium rounded-lg shadow-md hover:bg-red-600 transition"
                >
                  <FiTrash2 /> Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExpenseTable;
