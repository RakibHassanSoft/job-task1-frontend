import React from "react";
import { FaUtensils, FaShoppingCart, FaCarSide, FaEllipsisH } from "react-icons/fa";
import type { Expense } from "../DashboardHomeInterface";

interface Props {
  expenses: Expense[];
}

const RecentExpensesTable: React.FC<Props> = ({ expenses }) => {
  return (
    <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg overflow-x-auto">
      <h3 className="text-xl sm:text-2xl font-semibold mb-4">Recent Expenses</h3>

      <div className="min-w-[600px] md:min-w-full">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 sm:px-4 py-2 text-left text-sm sm:text-base font-medium text-gray-500">
                Title
              </th>
              <th className="px-3 sm:px-4 py-2 text-left text-sm sm:text-base font-medium text-gray-500">
                Amount
              </th>
              <th className="px-3 sm:px-4 py-2 text-left text-sm sm:text-base font-medium text-gray-500">
                Category
              </th>
              <th className="px-3 sm:px-4 py-2 text-left text-sm sm:text-base font-medium text-gray-500">
                Date
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {expenses.map((expense) => (
              <tr key={expense._id} className="hover:bg-gray-50 transition">
                <td className="px-3 sm:px-4 py-2 text-sm sm:text-base">{expense.title}</td>
                <td className="px-3 sm:px-4 py-2 text-sm sm:text-base">${expense.amount.toFixed(2)}</td>
                <td className="px-3 sm:px-4 py-2 text-sm sm:text-base flex items-center gap-2">
                  {expense.category === "Food" && <FaUtensils className="text-green-500" />}
                  {expense.category === "Shopping" && <FaShoppingCart className="text-yellow-500" />}
                  {expense.category === "Transport" && <FaCarSide className="text-blue-500" />}
                  {expense.category === "Others" && <FaEllipsisH className="text-red-500" />}
                  <span>{expense.category}</span>
                </td>
                <td className="px-3 sm:px-4 py-2 text-sm sm:text-base">
                  {new Date(expense.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile-friendly message if no expenses */}
      {expenses.length === 0 && (
        <p className="text-gray-500 text-center py-4 text-sm sm:text-base">
          No expenses found.
        </p>
      )}
    </div>
  );
};

export default RecentExpensesTable;
