import React, { useState } from "react";
import Swal from "sweetalert2";
import { fetchPrivate } from "../../../apiHandler/api";

import ExpenseFormFields from "./components/ExpenseFormFields";
import DashboardInfo from "./components/DashboardInfo";
import type { CreateExpenseResponse, ExpenseForm } from "./createExpanceInterface";



const CreateExpance = () => {
  const [form, setForm] = useState<ExpenseForm>({
    title: "",
    amount: 0,
    category: "Food",
    date: "",
  });

  const [loading, setLoading] = useState(false);
   const [count , setCount] = useState(0);
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
      if(response){
        await setCount(1)
      }

      if (response) {
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white  rounded-2xl shadow-xl p-6 border border-gray-200 flex flex-col justify-between hover:shadow-2xl transition">
        <h2 className="text-2xl font-bold text-gray-700 mb-6 border-b pb-2">
          Create New Expense
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Use ExpenseFormFields component */}
          <ExpenseFormFields count={count} onClick={()=>setCount(1)} form={form} handleChange={handleChange} />

          <button
           
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-xl font-semibold text-lg hover:bg-green-600 transition-shadow shadow-md hover:shadow-xl"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Expense"}
          </button>
        </form>
      </div>

      {/* Dashboard */}
      <DashboardInfo  count={count}/>
    </div>
  );
};

export default CreateExpance;
