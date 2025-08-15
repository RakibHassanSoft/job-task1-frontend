import { useEffect, useState } from "react";
import { getAllExpenses } from "../utils/getallData";

interface Expense {
  _id: string;
  title: string;
  amount: number;
  category: "Food" | "Transport" | "Shopping" | "Others";
  date: string;
}

const DashboardInfo = ({ refreshTrigger }: { refreshTrigger: number }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        setLoading(true);
        const items = await getAllExpenses(); // returns Expense[]
        setExpenses(items);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch expenses");
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, [refreshTrigger]); // Re-fetch when trigger changes

  const getCategoryIcon = (category: Expense["category"]) => {
    switch (category) {
      case "Food":
        return "🍔";
      case "Transport":
        return "🚗";
      case "Shopping":
        return "🛒";
      case "Others":
        return "✨";
      default:
        return "❓";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200 max-h-[600px] overflow-y-auto hover:shadow-2xl transition">
      <h3 className="text-xl font-semibold text-gray-600 mb-4 text-center">
        Dashboard Info
      </h3>
      <h3 className="text-xl font-semibold text-gray-600 mb-4 text-center">
        Dashboard {expenses.length}
      </h3>

      {loading ? (
        <p className="text-gray-500 text-center">Loading...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : expenses.length === 0 ? (
        <p className="text-gray-500 text-center">No expenses found.</p>
      ) : (
        <ul className="space-y-4">
          {expenses.map((expense) => (
            <li
              key={expense._id}
              className="flex justify-between items-center p-4 border rounded-xl hover:shadow-md transition"
            >
              <div className="flex items-center gap-3">
                <div className="bg-gray-100 p-2 rounded-full">
                  {getCategoryIcon(expense.category)}
                </div>
                <div>
                  <p className="text-gray-900 font-semibold">{expense.title}</p>
                  <p className="text-gray-500 text-sm">
                    {new Date(expense.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="text-gray-900 font-bold">
                ${expense.amount.toFixed(2)}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DashboardInfo;
