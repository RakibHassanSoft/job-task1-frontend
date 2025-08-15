import React, { useState } from "react";
import { useCurrentData } from "../../../hook/useCurrentData";
import { fetchPrivate } from "../../../apiHandler/api";
import FilterBar from "./components/FilterBar";
import ExpenseTable from "./components/ExpenseTable";
import DeleteConfirmation from "./components/DeleteConformation";
import EditExpenseModal from "./components/EditExpenseModal";
import type { Expense } from "./DashboardoperationInterface";



const categories = ["Food", "Transport", "Shopping", "Others"];

const DashboardOperation: React.FC = () => {
  const { data: expanceData, isLoading, isError, refetch } = useCurrentData();

  const [editOpen, setEditOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Expense>>({});

  // Filters
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  if (isLoading) return <p className="text-gray-500">Loading expenses...</p>;
  if (isError || !expanceData?.data)
    return <p className="text-red-500">Failed to load expenses.</p>;

  const expenses: Expense[] = expanceData.data;

  // Filter logic
  const filteredExpenses = expenses.filter((exp) => {
    const matchesCategory =
      selectedCategory === "" || exp.category === selectedCategory;

    const matchesSearch = exp.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesDate =
      (!startDate || new Date(exp.date) >= new Date(startDate)) &&
      (!endDate || new Date(exp.date) <= new Date(endDate));

    return matchesCategory && matchesSearch && matchesDate;
  });

  const openEdit = (exp: Expense) => {
    setForm(exp);
    setEditOpen(true);
  };

  const handleUpdate = async () => {
    if (!form._id) return;
    await fetchPrivate(`expense/update/${form._id}`, {
      method: "PATCH",
      data: {
        title: form.title,
        amount: form.amount,
        category: form.category,
        date: form.date,
      },
    });
    setEditOpen(false);
    refetch();
  };

  const handleDelete = async (id: string) => {
    await fetchPrivate(`expense/delete/${id}`, { method: "DELETE" });
    setDeleteId(null);
    refetch();
  };

  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold mb-6 text-gray-700">
        Expenses Dashboard
      </h3>

      {/* Filter Bar */}
      <FilterBar
        selectedCategory={selectedCategory}
        searchTerm={searchTerm}
        startDate={startDate}
        endDate={endDate}
        onCategoryChange={setSelectedCategory}
        onSearchChange={setSearchTerm}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
      />

      {/* Expense Table */}
      <ExpenseTable
        expenses={filteredExpenses}
        onEdit={openEdit}
        onDelete={setDeleteId}
      />

      {/* Edit Modal */}
      {editOpen && (
        <EditExpenseModal
          form={form}
          setForm={setForm}
          categories={categories}
          onClose={() => setEditOpen(false)}
          onSave={handleUpdate}
        />
      )}

      {/* Delete Confirmation */}
      {deleteId && (
        <DeleteConfirmation
          deleteId={deleteId}
          onCancel={() => setDeleteId(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
};

export default DashboardOperation;
