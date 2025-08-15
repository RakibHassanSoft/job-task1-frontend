// getCurrentUser.ts
import { fetchPrivate } from "./api";

export const getCurrentUser = async () => {
  try {
    const res = await fetchPrivate<{ user: { name: string; email: string } }>("/auth/me");
   
    return res;
  } catch {
    return null; // user not logged in or unauthorized
  }
};
