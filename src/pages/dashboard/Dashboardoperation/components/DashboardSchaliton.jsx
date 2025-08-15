import React from 'react';

const DashboardSchaliton = () => {
    return (
        <div className="space-y-4">
      {/* Header skeleton */}
      <div className="h-8 w-1/3 bg-gray-200 rounded animate-pulse"></div>

      {/* Filter Bar skeleton */}
      <div className="flex flex-wrap gap-4">
        <div className="h-10 w-40 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-10 w-40 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-10 w-40 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-10 flex-1 bg-gray-200 rounded animate-pulse"></div>
      </div>

      {/* Table skeleton */}
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <th
                    key={i}
                    className="px-4 py-2"
                  >
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                  </th>
                ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {Array(5)
              .fill(0)
              .map((_, row) => (
                <tr key={row}>
                  {Array(4)
                    .fill(0)
                    .map((_, col) => (
                      <td key={col} className="px-4 py-2">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
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

export default DashboardSchaliton;