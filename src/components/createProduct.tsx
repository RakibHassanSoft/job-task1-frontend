import React, { useState } from "react";
import Swal from "sweetalert2";
import { fetchPrivate } from "../apiHandler/api";
import { FaUtensils, FaCarSide, FaShoppingCart, FaEllipsisH } from "react-icons/fa";
import DashboardInfo from "./DashboardInfo";
import { getAllExpenses } from "../utils/getallData";

interface ExpenseForm {
  title: string;
  amount: number;
  category: "Food" | "Transport" | "Shopping" | "Others";
  date: string;
}

interface CreateExpenseResponse {
  _id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  user: string;
  createdAt: string;
  updatedAt: string;
}

const CreateExpense: React.FC = () => {
  const [form, setForm] = useState<ExpenseForm>({
    title: "",
    amount: 0,
    category: "Food",
    date: "",
  });
  
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "amount" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetchPrivate<CreateExpenseResponse>(
        "expense/create",
        { method: "POST", data: form }
      );
        console.log(response.data);
      // if (!response || !response._id) {
      //   throw new Error("Invalid response from server");
      // }
      if(response ) {
          Swal.fire({
        icon: "success",
        title: "Expense Created",
        text: `Expense "${response.title}" created successfully`,
        showConfirmButton: false,
        timer: 1500,
      });

      }


      setForm({ title: "", amount: 0, category: "Food", date: "" });
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.message || "Failed to create expense",
      });
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (category: ExpenseForm["category"]) => {
    switch (category) {
      case "Food":
        return <FaUtensils className="text-yellow-500" />;
      case "Transport":
        return <FaCarSide className="text-blue-500" />;
      case "Shopping":
        return <FaShoppingCart className="text-purple-500" />;
      case "Others":
        return <FaEllipsisH className="text-gray-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200 flex flex-col justify-between hover:shadow-2xl transition">
        <h2 className="text-2xl font-bold text-gray-700 mb-6 border-b pb-2">
          Create New Expense
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-xl font-semibold text-lg hover:bg-green-600 transition-shadow shadow-md hover:shadow-xl"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Expense"}
          </button>
        </form>
      </div>

      {/* Optional: Placeholder panel for dashboard balance, stats, or charts */}
      <div className="">
       <DashboardInfo/>
      </div>
    </div>
  );
};

export default CreateExpense;
