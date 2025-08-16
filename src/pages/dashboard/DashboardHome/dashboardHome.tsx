import React, { useEffect, useState } from "react";

import ExpensesChart from "./components/ExpensesChart";
import RecentExpensesTable from "./components/RecentExpensesTable";
import { fetchPrivate } from "../../../apiHandler/api";
import TopCards from "./components/TopCards";
import type { DashboardStats, Expense } from "./DashboardHomeInterface";
import DashboardSkeleton from "./components/DashboardSkeleton";
import Swal from "sweetalert2";

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
        if (!Array.isArray(data)) return;

        setExpenses(data);

        // Calculate stats
        setStats({
          totalExpenses: data.length,
          totalAmount: data.reduce((acc, e) => acc + e.amount, 0),
          foodExpenses: data.filter((e) => e.category === "Food").length,
          transportExpenses: data.filter((e) => e.category === "Transport")
            .length,
          shoppingExpenses: data.filter((e) => e.category === "Shopping")
            .length,
          otherExpenses: data.filter((e) => e.category === "Others").length,
        });
      } catch (err: any) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err.response?.data?.message || "Failed to fetch expenses",
          confirmButtonText: "OK",
        });

        // Optional: if it's an auth error
        if (err.response?.status === 401) {
          Swal.fire({
            icon: "warning",
            title: "Unauthorized",
            text: "Please login again",
            confirmButtonText: "OK",
          });
          // Optional: redirect to login
          // window.location.href = "/login";
        }
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  if (loading) return <DashboardSkeleton />;

return (
  <div className="p-1 lg:p-4 sm:p-1 space-y-8">
    {/* Top stats cards */}
    <TopCards stats={stats} />

    {/* Chart and Table responsive layout */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Chart */}
      <div className="w-full">
        <ExpensesChart expenses={expenses} />
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <RecentExpensesTable expenses={expenses.slice(0, 10)} />
      </div>
    </div>
  </div>
);

};

export default DashboardHome;
