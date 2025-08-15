import { fetchPrivate } from "../apiHandler/api";

interface Expense {
  _id: string;
  title: string;
  amount: number;
  category: "Food" | "Transport" | "Shopping" | "Others";
  date: string;
}

export async function getAllExpenses(): Promise<Expense[]> {
  try {
    // Expecting { data: Expense[] } from the API
    const response = await fetchPrivate<{ data: Expense[] }>("expense/all");

    // Extract the actual array
    return response.data;
  } catch (error) {
    console.error("Error fetching expenses:", error);
    return [];
  }
}
