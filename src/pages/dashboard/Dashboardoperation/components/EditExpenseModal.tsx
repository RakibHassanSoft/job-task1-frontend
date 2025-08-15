import React, { useState } from "react";
import { FiX, FiSave } from "react-icons/fi";
import type { Props } from "../DashboardoperationInterface";

const EditExpenseModal: React.FC<Props> = ({
  form,
  setForm,
  categories,
  onClose,
  onSave,
}) => {
  // Initial date from form
  const initialDate = form.date ? new Date(form.date) : new Date();
  const [selectedDate, setSelectedDate] = useState(initialDate);

  const [currentMonth, setCurrentMonth] = useState(
    new Date(initialDate.getFullYear(), initialDate.getMonth(), 1)
  );

  // Handle selecting a day
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date); // Update local selection
    setForm({ ...form, date: date.toISOString().split("T")[0] }); // Update form
  };

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const daysInMonth = Array.from(
    {
      length: new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + 1,
        0
      ).getDate(),
    },
    (_, i) => new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i + 1)
  );

  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
      <div className="bg-white rounded-xl p-6 shadow-xl w-full max-w-md animate-fadeIn">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-700">Edit Expense</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            <FiX size={24} />
          </button>
        </div>

        <div className="space-y-4">
          {/* Title */}
          <input
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-400 focus:outline-none shadow-sm transition-all duration-200"
            placeholder="Title"
            value={form.title || ""}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          {/* Amount */}
          <input
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-400 focus:outline-none shadow-sm transition-all duration-200"
            type="number"
            placeholder="Amount"
            value={form.amount || ""}
            onChange={(e) =>
              setForm({ ...form, amount: parseFloat(e.target.value) })
            }
          />

          {/* Category */}
          <select
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-400 focus:outline-none shadow-sm transition-all duration-200"
            value={form.category || ""}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          {/* Custom Calendar */}
          <div className="border border-gray-300 rounded-lg p-3 shadow-sm">
            {/* Month navigation */}
            <div className="flex justify-between items-center mb-2">
              <button
                onClick={prevMonth}
                className="px-2 py-1 rounded hover:bg-gray-100 transition"
              >
                &#8592;
              </button>
              <span className="font-semibold">
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </span>
              <button
                onClick={nextMonth}
                className="px-2 py-1 rounded hover:bg-gray-100 transition"
              >
                &#8594;
              </button>
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-1 text-center">
              {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => (
                <div key={d} className="font-semibold text-gray-500">{d}</div>
              ))}

              {daysInMonth.map((day) => {
                const isSelected =
                  selectedDate.toDateString() === day.toDateString();
                return (
                  <button
                    key={day.toISOString()}
                    onClick={() => handleDateSelect(day)}
                    className={`py-1 rounded-lg transition-colors duration-200 ${
                      isSelected
                        ? "bg-green-500 text-white font-semibold shadow-md"
                        : "hover:bg-green-100"
                    }`}
                  >
                    {day.getDate()}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-3 mt-4">
            <button
              className="flex items-center gap-2 px-5 py-2 border rounded-lg text-gray-600 hover:bg-gray-100 transition-all duration-200"
              onClick={onClose}
            >
              <FiX /> Cancel
            </button>
            <button
              className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-green-400 to-green-500 text-white font-semibold rounded-lg shadow-md hover:from-green-500 hover:to-green-600 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg"
              onClick={onSave}
            >
              <FiSave /> Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditExpenseModal;
