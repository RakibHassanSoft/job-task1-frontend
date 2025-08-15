// getCurrentUser.ts
import { fetchPrivate } from "./api";

export const getCurrentdata = async () => {
  try {
    const res = await fetchPrivate<{ user: { name: string; email: string } }>("expense/all");
   
    return res;
  } catch {
    return null; // user not logged in or unauthorized
  }
};
