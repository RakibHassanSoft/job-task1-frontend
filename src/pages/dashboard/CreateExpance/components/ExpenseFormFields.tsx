import React from "react";
import { FaUtensils, FaCarSide, FaShoppingCart, FaEllipsisH } from "react-icons/fa";

interface ExpenseFormFieldsProps {
  form: {
    title: string;
    amount: number;
    category: "Food" | "Transport" | "Shopping" | "Others";
    date: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const ExpenseFormFields: React.FC<ExpenseFormFieldsProps> = ({ form, handleChange }) => {
  const getCategoryIcon = (category: ExpenseFormFieldsProps["form"]["category"]) => {
    switch (category) {
      case "Food": return <FaUtensils className="text-yellow-500" />;
      case "Transport": return <FaCarSide className="text-blue-500" />;
      case "Shopping": return <FaShoppingCart className="text-purple-500" />;
      case "Others": return <FaEllipsisH className="text-gray-500" />;
      default: return null;
    }
  };

  return (
    <>
      {/* Title */}
      <div>
        <label className="block text-gray-500 font-medium mb-1">Title</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
          placeholder="Enter expense title"
          required
        />
      </div>

      {/* Amount */}
      <div>
        <label className="block text-gray-500 font-medium mb-1">Amount</label>
        <input
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
          placeholder="Enter amount"
          min={0.01}
          step={0.01}
          required
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-gray-500 font-medium mb-1">Category</label>
        <div className="relative">
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg appearance-none pr-10 focus:ring-2 focus:ring-green-400 focus:outline-none"
          >
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Shopping">Shopping</option>
            <option value="Others">Others</option>
          </select>
          <div className="absolute right-3 top-3">{getCategoryIcon(form.category)}</div>
        </div>
      </div>

      {/* Date */}
      <div>
        <label className="block text-gray-500 font-medium mb-1">Date</label>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
          required
        />
      </div>
    </>
  );
};

export default ExpenseFormFields;
