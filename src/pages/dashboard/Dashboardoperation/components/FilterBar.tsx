import React from "react";
import type { FilterBarProps } from "../DashboardoperationInterface";

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
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {/* Category Filter */}
      <select
        className="border rounded px-3 py-2"
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="">All Categories</option>
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Shopping">Shopping</option>
        <option value="Others">Others</option>
      </select>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search expenses..."
        className="border rounded px-3 py-2 flex-1"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      {/* Start Date */}
      <input
        type="date"
        className="border rounded px-3 py-2"
        value={startDate}
        onChange={(e) => onStartDateChange(e.target.value)}
      />

      {/* End Date */}
      <input
        type="date"
        className="border rounded px-3 py-2"
        value={endDate}
        onChange={(e) => onEndDateChange(e.target.value)}
      />
    </div>
  );
};

export default FilterBar;
