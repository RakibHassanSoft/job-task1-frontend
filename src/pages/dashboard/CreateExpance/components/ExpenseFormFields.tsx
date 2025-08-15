import React, { useState, useEffect, useRef } from "react";
import { FaUtensils, FaCarSide, FaShoppingCart, FaEllipsisH, FaCalendarAlt, FaMoneyBillWave } from "react-icons/fa";
import type { ExpenseFormFieldsProps } from "../createExpanceInterface";
import { useCurrentData } from "../../../../hook/useCurrentData";



const ExpenseFormFields: React.FC<ExpenseFormFieldsProps> = ({count, form, handleChange }) => {

  const { data, isLoading, isError ,refetch} = useCurrentData();

  const getCategoryIcon = (category: ExpenseFormFieldsProps["form"]["category"]) => {
    switch (category) {
      case "Food": return <FaUtensils className="text-yellow-500" />;
      case "Transport": return <FaCarSide className="text-blue-500" />;
      case "Shopping": return <FaShoppingCart className="text-purple-500" />;
      case "Others": return <FaEllipsisH className="text-gray-500" />;
      default: return null;
    }
  };

  // Calendar state
  const [calendarOpen, setCalendarOpen] = useState(false);
 
  const [selectedDate, setSelectedDate] = useState(form.date ? new Date(form.date) : null);
  const [currentMonth, setCurrentMonth] = useState(selectedDate ? new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1) : new Date());
  const calendarRef = useRef<HTMLDivElement>(null);
  const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  const handleClickOutside = (e: MouseEvent) => {
    if (calendarRef.current && !calendarRef.current.contains(e.target as Node)) setCalendarOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const generateDays = (month: Date) => {
    const firstDayOfMonth = new Date(month.getFullYear(), month.getMonth(), 1).getDay();
    const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    const daysArray: (Date | null)[] = Array(firstDayOfMonth).fill(null);
    for (let i = 1; i <= daysInMonth; i++) daysArray.push(new Date(month.getFullYear(), month.getMonth(), i));
    return daysArray;
  };

  const handleDateSelect = (day: Date) => {
    setSelectedDate(day);
    handleChange({ target: { name: "date", value: day.toISOString().split("T")[0] } } as any);
    setCalendarOpen(false);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg space-y-6">
      {/* Top Section with Money Icon */}
      <div className="flex flex-col lg:h-96 justify-center items-center gap-3 bg-green-50 p-4 rounded-lg shadow-sm">
        <FaMoneyBillWave className="text-green-500 text-3xl" />
          {
        data &&  <div>
          <h3 className="text-lg font-semibold text-gray-700">Total data</h3>
          <p className="text-gray-500 font-bold text-center text-xl">{data?.data?.length + count}</p>
        </div>
       }
        <div>
          <h3 className="text-lg font-semibold text-gray-700">Add New Expense</h3>
          <p className="text-gray-500 text-sm">Fill in the details below</p>
        </div>
     
      </div>

      {/* Form Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Title */}
        <div className="flex flex-col  relative">
          <label className="text-gray-600 font-medium mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter expense title"
            required
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm transition duration-200"
          />
          <FaEllipsisH className="absolute left-3 top-12 text-gray-400 pointer-events-none" />
        </div>

        {/* Amount */}
        <div className="flex flex-col relative">
          <label className="text-gray-600 font-medium mb-2">Amount</label>
          <input
            type="number"
            name="amount"
            // value={form.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            min={0.01}
            step={0.01}
            required
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm transition duration-200"
          />
          <span className="absolute left-3 top-11 text-gray-400">$</span>
        </div>

        {/* Category */}
        <div className="flex flex-col relative">
          <label className="text-gray-600 font-medium mb-2">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm pr-10 transition duration-200"
          >
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Shopping">Shopping</option>
            <option value="Others">Others</option>
          </select>
          <div className="absolute left-3 top-12">{getCategoryIcon(form.category)}</div>
        </div>

        {/* Date */}
        <div className="flex flex-col relative" ref={calendarRef}>
          <label className="text-gray-600 font-medium mb-2">Date</label>
          <input
            type="text"
            readOnly
            value={selectedDate ? selectedDate.toISOString().split("T")[0] : ""}
            placeholder="Select date"
            onClick={() => setCalendarOpen(!calendarOpen)}
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm cursor-pointer transition duration-200"
          />
          <FaCalendarAlt className="absolute left-3 top-12 text-gray-400" />

          {calendarOpen && (
            <div className="absolute top-full mt-2 border rounded-lg bg-white shadow-lg z-50 p-3 w-full">
              {/* Month Navigation */}
              <div className="flex justify-between items-center mb-2 text-gray-600 font-semibold">
                <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth()-1, 1))} className="px-2 py-1 rounded hover:bg-gray-100">&lt;</button>
                <span>{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</span>
                <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth()+1, 1))} className="px-2 py-1 rounded hover:bg-gray-100">&gt;</button>
              </div>

              {/* Week Days */}
              <div className="grid grid-cols-7 text-center text-gray-500 font-medium mb-2">
                {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => <div key={d}>{d}</div>)}
              </div>

              {/* Days */}
              <div className="grid grid-cols-7 gap-1 text-center">
                {generateDays(currentMonth).map((day, idx) => {
                  if (!day) return <div key={idx}></div>;
                  const isSelected = selectedDate && day.toDateString() === selectedDate.toDateString();
                  return (
                    <button
                      key={day.toISOString()}
                      onClick={() => handleDateSelect(day)}
                      className={`py-1 rounded-lg transition-all duration-200 relative ${
                        isSelected ? "bg-green-500 text-white font-semibold shadow-md" : "hover:bg-green-100"
                      }`}
                    >
                      {day.getDate()}
                      {isSelected && <FaUtensils className="absolute right-1 top-1 text-white text-xs" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpenseFormFields;
