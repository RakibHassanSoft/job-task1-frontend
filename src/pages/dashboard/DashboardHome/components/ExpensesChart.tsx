import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import type { Expense } from "../DashboardHomeInterface";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  expenses: Expense[];
}

const ExpensesChart: React.FC<Props> = ({ expenses }) => {
  const today = new Date();
  const fiveDaysAgo = new Date();
  fiveDaysAgo.setDate(today.getDate() - 5);

  const [startDate, setStartDate] = useState(fiveDaysAgo.toISOString().split("T")[0]);
  const [endDate, setEndDate] = useState(today.toISOString().split("T")[0]);
  const [category, setCategory] = useState("All");
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    const filtered = expenses.filter((e) => {
      const expenseDate = new Date(e.date);
      const inDateRange =
        expenseDate >= new Date(startDate) && expenseDate <= new Date(endDate);
      const inCategory = category === "All" ? true : e.category === category;
      return inDateRange && inCategory;
    });
    setFilteredExpenses(filtered);
  }, [startDate, endDate, category, expenses]);

  const sorted = [...filteredExpenses].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const data = {
    labels: sorted.map((e) =>
      new Date(e.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })
    ),
    datasets: [
      {
        label: `${category} Expenses ($)`,
        data: sorted.map((e) => e.amount),
        fill: false,
        borderColor: "#34D399",
        backgroundColor: "#34D399",
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top", labels: { font: { size: 14 } } },
      title: {
        display: true,
        text: "Expenses Over Time",
        font: { size: 18, weight: "bold" },
        color: "#374151",
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `$${context.parsed.y.toFixed(2)}`,
        },
      },
    },
    scales: {
      x: { ticks: { color: "#374151", font: { size: 12 } }, grid: { display: false } },
      y: {
        beginAtZero: true,
        ticks: { color: "#6B7280", font: { size: 12 } },
        grid: { color: "#E5E7EB" },
      },
    },
  };

  return (
    <div className="w-full flex justify-center px-2 sm:px-4 lg:px-6">
      <div className="w-full max-w-7xl bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg flex flex-col gap-6">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6 flex-wrap 
                bg-green-50 p-6 rounded-xl shadow-md">
  {/* Start Date */}
  <div className="flex-1 min-w-[140px]">
    <label className="block text-gray-700 text-sm font-medium mb-2">Start Date</label>
    <input
      type="date"
      className="w-full border border-green-300 rounded-lg p-2 sm:p-3 text-sm sm:text-base
                 shadow-sm hover:shadow-md transition focus:ring-2 focus:ring-green-400
                 focus:border-green-400 focus:outline-none bg-white"
      value={startDate}
      onChange={(e) => setStartDate(e.target.value)}
    />
  </div>

  {/* End Date */}
  <div className="flex-1 min-w-[140px]">
    <label className="block text-gray-700 text-sm font-medium mb-2">End Date</label>
    <input
      type="date"
      className="w-full border border-green-300 rounded-lg p-2 sm:p-3 text-sm sm:text-base
                 shadow-sm hover:shadow-md transition focus:ring-2 focus:ring-green-400
                 focus:border-green-400 focus:outline-none bg-white"
      value={endDate}
      onChange={(e) => setEndDate(e.target.value)}
    />
  </div>

  {/* Category Select */}
  <div className="flex-1 min-w-[140px]">
    <label className="block text-gray-700 text-sm font-medium mb-2">Category</label>
    <select
      className="w-full border border-green-300 rounded-lg p-2 sm:p-3 text-sm sm:text-base
                 shadow-sm hover:shadow-md transition focus:ring-2 focus:ring-green-400
                 focus:border-green-400 focus:outline-none bg-white"
      value={category}
      onChange={(e) => setCategory(e.target.value)}
    >
      <option value="All">All</option>
      <option value="Food">Food</option>
      <option value="Transport">Transport</option>
      <option value="Shopping">Shopping</option>
      <option value="Others">Others</option>
    </select>
  </div>
</div>


        {/* Chart */}
        <div className="w-full min-h-[350px] sm:min-h-[400px] md:min-h-[450px] lg:min-h-[500px]">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default ExpensesChart;
