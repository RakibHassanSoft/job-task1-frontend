import React, { useEffect, useState } from "react";

import ExpensesChart from "./components/ExpensesChart";
import RecentExpensesTable from "./components/RecentExpensesTable";
import { fetchPrivate } from "../../../apiHandler/api";
import TopCards from "./components/TopCards";
import type { DashboardStats, Expense } from "./DashboardHomeInterface";
import DashboardSkeleton from "./components/DashboardSkeleton";

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
          transportExpenses: data.filter((e) => e.category === "Transport").length,
          shoppingExpenses: data.filter((e) => e.category === "Shopping").length,
          otherExpenses: data.filter((e) => e.category === "Others").length,
        });
      } catch (err) {
        console.error("Error fetching expenses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  if (loading) return <DashboardSkeleton />;

  return (
    <div className="p-6 space-y-8 ">
      <TopCards stats={stats} />

      {/* Chart and Table in one row on large screens */}
      <div className="flex flex-col gap-10 ">
        <ExpensesChart expenses={expenses} />
        <RecentExpensesTable expenses={expenses.slice(0, 10)} />
      </div>
    </div>
  );
};

export default DashboardHome;
