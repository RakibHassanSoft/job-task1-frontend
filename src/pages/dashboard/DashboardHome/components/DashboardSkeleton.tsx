import React from "react";

const DashboardSkeleton: React.FC = () => {
  return (
    <div className="p-6 space-y-8 animate-pulse">
      {/* Top Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={idx} className="rounded-xl bg-white shadow-md p-6 flex items-center gap-4">
            <div className="bg-gray-200 rounded-full w-12 h-12" />
            <div className="flex-1 space-y-2">
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              <div className="h-6 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Skeleton */}
      <div className="bg-white p-6 rounded-xl shadow-lg h-64 md:h-80 lg:h-96" />

      {/* Recent Expenses Table Skeleton */}
      <div className="bg-white p-6 rounded-xl shadow-lg overflow-x-auto">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-4" />
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {Array.from({ length: 4 }).map((_, idx) => (
                <th key={idx} className="px-4 py-2">
                  <div className="h-3 bg-gray-200 rounded w-3/4 mx-auto"></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {Array.from({ length: 5 }).map((_, idx) => (
              <tr key={idx}>
                {Array.from({ length: 4 }).map((_, colIdx) => (
                  <td key={colIdx} className="px-4 py-2">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
