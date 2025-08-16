import { useCurrentData } from "../../../../hook/useCurrentData";
import type { Expense } from "../createExpanceInterface";
// Type for props
interface DashboardInfoProps {
  count: number;
}
// Type for the API response
interface CurrentDataResponse {
  data: Expense[];
}

const DashboardInfo: React.FC<DashboardInfoProps> = ({ count }) => {
  // Typed React Query hook
  const { data, isLoading, isError } = useCurrentData() as {
    data?: CurrentDataResponse;
    isLoading: boolean;
    isError: boolean;
  };

  // Safely extract expenses array
  const expenses: Expense[] = data?.data || [];

  // Sort most recent first
  const sortedExpenses = [...expenses].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

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
    <div
      className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6
                 h-auto lg:h-[calc(65vh-2rem)] max-h-[calc(100vh-2rem)]
                 overflow-y-auto hover:shadow-2xl transition flex flex-col"
    >
      <h3 className="text-xl font-semibold text-gray-600 mb-4 text-center">
        Dashboard Info
      </h3>
      <h3 className="text-lg font-medium text-gray-500 mb-6 text-center">
        Total Expenses: {expenses.length + count}
      </h3>

      {isLoading ? (
        <div className="flex flex-col gap-4 animate-pulse">
          <div className="h-6 bg-gray-300 rounded w-1/3 mx-auto"></div>
          <div className="h-5 bg-gray-200 rounded w-1/4 mx-auto"></div>

          <ul className="space-y-4 mt-4">
            {Array.from({ length: 5 }).map((_, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center p-4 border rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-gray-300 p-3 rounded-full w-10 h-10"></div>
                  <div className="flex flex-col gap-2">
                    <div className="h-4 bg-gray-300 rounded w-32"></div>
                    <div className="h-3 bg-gray-200 rounded w-20"></div>
                  </div>
                </div>
                <div className="h-4 bg-gray-300 rounded w-12"></div>
              </li>
            ))}
          </ul>
        </div>
      ) : isError ? (
        <p className="text-red-500 text-center">Failed to load expenses.</p>
      ) : sortedExpenses.length === 0 ? (
        <p className="text-gray-500 text-center">No expenses found.</p>
      ) : (
        <ul className="space-y-4">
          {sortedExpenses.map((expense) => (
            <li
              key={expense._id}
              className="flex justify-between items-center p-4 border rounded-xl hover:shadow-md transition"
            >
              <div className="flex items-center gap-3">
                <div className="bg-gray-100 p-2 rounded-full text-lg">
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
