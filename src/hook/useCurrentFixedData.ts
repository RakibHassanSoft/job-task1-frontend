import { useQuery } from "@tanstack/react-query";
import { fetchPrivate } from "../apiHandler/api"; // your fetch helper
import type { Expense } from "../pages/dashboard/Dashboardoperation/DashboardoperationInterface";

// API response type
interface CurrentDataResponse {
  data: Expense[];
}

// Self-contained hook with fetch logic
export const useCurrentDataFixed = () => {
  const fetchCurrentData = async (): Promise<CurrentDataResponse> => {
    const res = await fetchPrivate<CurrentDataResponse>("/expense/all"); // your endpoint
    return res;
  };

  return useQuery<CurrentDataResponse>({
    queryKey: ["currentData"],
    queryFn: fetchCurrentData,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false,
  });
};
