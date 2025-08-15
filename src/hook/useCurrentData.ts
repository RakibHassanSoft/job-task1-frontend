import { useQuery } from "@tanstack/react-query";
import { getCurrentdata } from "../apiHandler/getCurrentData";

export const useCurrentData = () => {
  return useQuery({
    queryKey: ["currentData"], // unique cache key
    queryFn: getCurrentdata,   // your existing function
    staleTime: 1000 * 60 * 5,  // 5 min cache
    retry: false,              // don't retry if unauthorized
  });
};
