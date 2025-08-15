
// Types
export interface Expense {
  _id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
}

export interface DashboardStats {
  totalExpenses: number;
  totalAmount: number;
  foodExpenses: number;
  transportExpenses: number;
  shoppingExpenses: number;
  otherExpenses: number;
}
