export interface ExpenseForm {
  title: string;
  amount: number;
  category: "Food" | "Transport" | "Shopping" | "Others";
  date: string;
}

export interface CreateExpenseResponse {
  _id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  user: string;
  createdAt: string;
  updatedAt: string;
}

export interface Expense {
  _id: string;
  title: string;
  amount: number;
  category: "Food" | "Transport" | "Shopping" | "Others";
  date: string;
}

export interface ExpenseFormFieldsProps {
  form: {
    title: string;
    amount: number;
    category: "Food" | "Transport" | "Shopping" | "Others";
    date: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}