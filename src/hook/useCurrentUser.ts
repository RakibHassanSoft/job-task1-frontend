import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../apiHandler/getCurrentUser";

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"], // unique cache key
    queryFn: getCurrentUser,   // your existing function
    staleTime: 1000 * 60 * 5,  // 5 min cache
    retry: false,              // don't retry if unauthorized
  });
};
