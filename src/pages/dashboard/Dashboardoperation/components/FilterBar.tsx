import React, { useState, useEffect, useRef } from "react";
import type { FilterBarProps } from "../DashboardoperationInterface";
import { FaUtensils, FaShoppingCart, FaCarSide, FaEllipsisH, FaSearch, FaCalendarAlt } from "react-icons/fa";

const categoryIcons: Record<string, React.ReactNode> = {
  Food: <FaUtensils className="text-green-500" />,
  Transport: <FaCarSide className="text-blue-500" />,
  Shopping: <FaShoppingCart className="text-yellow-500" />,
  Others: <FaEllipsisH className="text-red-500" />,
};

const FilterBar: React.FC<FilterBarProps> = ({
  selectedCategory,
  searchTerm,
  startDate,
  endDate,
  onCategoryChange,
  onSearchChange,
  onStartDateChange,
  onEndDateChange,
}) => {
  const [startSelected, setStartSelected] = useState(startDate ? new Date(startDate) : null);
  const [endSelected, setEndSelected] = useState(endDate ? new Date(endDate) : null);

  const [startCalendarOpen, setStartCalendarOpen] = useState(false);
  const [endCalendarOpen, setEndCalendarOpen] = useState(false);

  const startRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  const handleClickOutside = (e: MouseEvent) => {
    if (startRef.current && !startRef.current.contains(e.target as Node)) setStartCalendarOpen(false);
    if (endRef.current && !endRef.current.contains(e.target as Node)) setEndCalendarOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const generateDays = (month: Date) => {
    return Array.from(
      { length: new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate() },
      (_, i) => new Date(month.getFullYear(), month.getMonth(), i + 1)
    );
  };

  const [startMonth, setStartMonth] = useState(startSelected ? new Date(startSelected.getFullYear(), startSelected.getMonth(), 1) : new Date());
  const [endMonth, setEndMonth] = useState(endSelected ? new Date(endSelected.getFullYear(), endSelected.getMonth(), 1) : new Date());

  const handleStartSelect = (day: Date) => {
    setStartSelected(day);
    onStartDateChange(day.toISOString().split("T")[0]);
    setStartCalendarOpen(false);
  };

  const handleEndSelect = (day: Date) => {
    setEndSelected(day);
    onEndDateChange(day.toISOString().split("T")[0]);
    setEndCalendarOpen(false);
  };

  return (
    <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-6 items-end justify-center">

      {/* Category Select */}
      <div className="flex-1 min-w-[150px] relative">
        <label className="block text-gray-500 text-sm mb-1">Category</label>
        <div className="relative">
          <select
            className="w-full border border-gray-300 rounded-lg p-2 pl-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 appearance-none"
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Shopping">Shopping</option>
            <option value="Others">Others</option>
          </select>
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            {selectedCategory ? categoryIcons[selectedCategory] : <FaEllipsisH className="text-gray-400" />}
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="flex-1 min-w-[200px] relative">
        <label className="block text-gray-500 text-sm mb-1">Search</label>
        <div className="relative">
          <input
            type="text"
            placeholder="Search expenses..."
            className="w-full border border-gray-300 rounded-lg p-2 pl-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Start Date */}
      <div className="flex-1 min-w-[150px] relative" ref={startRef}>
        <label className="block text-gray-500 text-sm mb-1">Start Date</label>
        <div className="relative">
          <input
            className="w-full border border-gray-300 rounded-lg p-2 pl-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 cursor-pointer"
            readOnly
            placeholder="Select start date"
            value={startSelected ? startSelected.toISOString().split("T")[0] : ""}
            onClick={() => setStartCalendarOpen(!startCalendarOpen)}
          />
          <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />

          {startCalendarOpen && (
            <div className="absolute top-full mt-1 border rounded-lg bg-white shadow-lg z-50 p-2 w-full">
              <div className="flex justify-between items-center mb-2">
                <button onClick={() => setStartMonth(new Date(startMonth.getFullYear(), startMonth.getMonth()-1, 1))}>&lt;</button>
                <span>{monthNames[startMonth.getMonth()]} {startMonth.getFullYear()}</span>
                <button onClick={() => setStartMonth(new Date(startMonth.getFullYear(), startMonth.getMonth()+1, 1))}>&gt;</button>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center font-semibold text-gray-500 mb-1">
                {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => <div key={d}>{d}</div>)}
              </div>
              <div className="grid grid-cols-7 gap-1 text-center">
                {generateDays(startMonth).map(day => {
                  const isSelected = startSelected && day.toDateString() === startSelected.toDateString();
                  return (
                    <button
                      key={day.toISOString()}
                      onClick={() => handleStartSelect(day)}
                      className={`py-1 rounded-lg transition-colors duration-200 ${
                        isSelected ? "bg-green-500 text-white font-semibold shadow-md" : "hover:bg-green-100"
                      }`}
                    >
                      {day.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* End Date */}
      <div className="flex-1 min-w-[150px] relative" ref={endRef}>
        <label className="block text-gray-500 text-sm mb-1">End Date</label>
        <div className="relative">
          <input
            className="w-full border border-gray-300 rounded-lg p-2 pl-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 cursor-pointer"
            readOnly
            placeholder="Select end date"
            value={endSelected ? endSelected.toISOString().split("T")[0] : ""}
            onClick={() => setEndCalendarOpen(!endCalendarOpen)}
          />
          <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />

          {endCalendarOpen && (
            <div className="absolute top-full mt-1 border rounded-lg bg-white shadow-lg z-50 p-2 w-full">
              <div className="flex justify-between items-center mb-2">
                <button onClick={() => setEndMonth(new Date(endMonth.getFullYear(), endMonth.getMonth()-1, 1))}>&lt;</button>
                <span>{monthNames[endMonth.getMonth()]} {endMonth.getFullYear()}</span>
                <button onClick={() => setEndMonth(new Date(endMonth.getFullYear(), endMonth.getMonth()+1, 1))}>&gt;</button>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center font-semibold text-gray-500 mb-1">
                {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => <div key={d}>{d}</div>)}
              </div>
              <div className="grid grid-cols-7 gap-1 text-center">
                {generateDays(endMonth).map(day => {
                  const isSelected = endSelected && day.toDateString() === endSelected.toDateString();
                  return (
                    <button
                      key={day.toISOString()}
                      onClick={() => handleEndSelect(day)}
                      className={`py-1 rounded-lg transition-colors duration-200 ${
                        isSelected ? "bg-green-500 text-white font-semibold shadow-md" : "hover:bg-green-100"
                      }`}
                    >
                      {day.getDate()}
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

export default FilterBar;
