import { useQuery } from "@tanstack/react-query";
import { getCurrentdata } from "../apiHandler/getCurrentData";

export const useCurrentData = () => {
  const query = useQuery({
    queryKey: ["currentData"], // unique cache key
    queryFn: getCurrentdata,
    staleTime: 1000 * 60 * 5,  // 5 min cache
    retry: false,
  });

  return query; // query object contains: data, isLoading, isError, refetch, etc.
};
