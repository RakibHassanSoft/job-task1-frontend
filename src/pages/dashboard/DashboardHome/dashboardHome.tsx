// DashboardHome.tsx
import React, { useEffect, useState } from "react";
import {
  FaUtensils,
  FaShoppingCart,
  FaCarSide,
  FaEllipsisH,
  FaClipboardList,
  FaDollarSign,
} from "react-icons/fa";
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
import type { ChartOptions } from "chart.js";
import { Line } from "react-chartjs-2";
import { fetchPrivate } from "../../../apiHandler/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Expense type
interface Expense {
  _id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
}

// Dashboard statistics type
interface DashboardStats {
  totalExpenses: number;
  totalAmount: number;
  foodExpenses: number;
  transportExpenses: number;
  shoppingExpenses: number;
  otherExpenses: number;
}

const DashboardHome: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalExpenses: 0,
    totalAmount: 0,
    foodExpenses: 0,
    transportExpenses: 0,
    shoppingExpenses: 0,
    otherExpenses: 0,
  });

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetchPrivate<{ data: Expense[] }>("expense/all");
        const data = response.data;

        if (!Array.isArray(data)) {
          console.error("Expenses data is not an array:", data);
          setExpenses([]);
          setLoading(false);
          return;
        }

        setExpenses(data);

        // Calculate statistics
        const totalAmount = data.reduce((acc, e) => acc + e.amount, 0);
        const foodExpenses = data.filter((e) => e.category === "Food").length;
        const transportExpenses = data.filter((e) => e.category === "Transport").length;
        const shoppingExpenses = data.filter((e) => e.category === "Shopping").length;
        const otherExpenses = data.filter((e) => e.category === "Others").length;

        setStats({
          totalExpenses: data.length,
          totalAmount,
          foodExpenses,
          transportExpenses,
          shoppingExpenses,
          otherExpenses,
        });
      } catch (err) {
        console.error("Error fetching expenses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  // Line chart for expenses over time
  const sortedExpenses = [...expenses].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const chartData = {
    labels: sortedExpenses.map((e) =>
      new Date(e.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })
    ),
    datasets: [
      {
        label: "Expense Amount ($)",
        data: sortedExpenses.map((e) => e.amount),
        fill: false,
        borderColor: "#34D399",
        backgroundColor: "#34D399",
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: { position: "top", labels: { font: { size: 14 } } },
      title: {
        display: true,
        text: "Expenses Over Time",
        font: { size: 18, weight: "bold" },
        color: "#374151",
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) => `$${context.parsed.y.toFixed(2)}`,
        },
      },
    },
    scales: {
      x: { ticks: { color: "#374151" }, grid: { display: false } },
      y: { beginAtZero: true, ticks: { color: "#6B7280" }, grid: { color: "#E5E7EB" } },
    },
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="p-6">
      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="rounded-xl bg-white shadow-md p-6 flex items-center gap-4 hover:shadow-xl transition">
          <div className="bg-green-100 p-3 rounded-full">
            <FaClipboardList className="text-green-600 text-2xl" />
          </div>
          <div>
            <h3 className="text-gray-500 text-sm font-medium">Total Expenses</h3>
            <p className="text-gray-900 text-2xl font-semibold">{stats.totalExpenses}</p>
          </div>
        </div>
        <div className="rounded-xl bg-white shadow-md p-6 flex items-center gap-4 hover:shadow-xl transition">
          <div className="bg-blue-100 p-3 rounded-full">
            <FaDollarSign className="text-blue-600 text-2xl" />
          </div>
          <div>
            <h3 className="text-gray-500 text-sm font-medium">Total Amount</h3>
            <p className="text-gray-900 text-2xl font-semibold">${stats.totalAmount.toFixed(2)}</p>
          </div>
        </div>
        <div className="rounded-xl bg-white shadow-md p-6 flex items-center gap-4 hover:shadow-xl transition">
          <div className="bg-yellow-100 p-3 rounded-full">
            <FaUtensils className="text-yellow-600 text-2xl" />
          </div>
          <div>
            <h3 className="text-gray-500 text-sm font-medium">Food Expenses</h3>
            <p className="text-gray-900 text-2xl font-semibold">{stats.foodExpenses}</p>
          </div>
        </div>
        <div className="rounded-xl bg-white shadow-md p-6 flex items-center gap-4 hover:shadow-xl transition">
          <div className="bg-red-100 p-3 rounded-full">
            <FaCarSide className="text-red-600 text-2xl" />
          </div>
          <div>
            <h3 className="text-gray-500 text-sm font-medium">Transport Expenses</h3>
            <p className="text-gray-900 text-2xl font-semibold">{stats.transportExpenses}</p>
          </div>
        </div>
      </div>

      {/* Line Chart */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
        <Line data={chartData} options={chartOptions} />
      </div>

      {/* Recent Expenses Table */}
      <div className="bg-white p-6 rounded-xl shadow-lg overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <FaEllipsisH /> Recent Expenses
        </h3>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Title</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Amount</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Category</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {expenses.slice(0, 10).map((expense) => (
              <tr key={expense._id}>
                <td className="px-4 py-2">{expense.title}</td>
                <td className="px-4 py-2">${expense.amount.toFixed(2)}</td>
                <td className="px-4 py-2 flex items-center gap-2">
                  {expense.category === "Food" && <FaUtensils className="text-green-500" />}
                  {expense.category === "Shopping" && <FaShoppingCart className="text-yellow-500" />}
                  {expense.category === "Transport" && <FaCarSide className="text-blue-500" />}
                  {expense.category === "Others" && <FaEllipsisH className="text-red-500" />}
                  {expense.category}
                </td>
                <td className="px-4 py-2">{new Date(expense.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardHome;
