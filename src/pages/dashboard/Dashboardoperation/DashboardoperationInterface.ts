export type FilterBarProps = {
  selectedCategory: string;
  searchTerm: string;
  startDate: string;
  endDate: string;
  onCategoryChange: (value: string) => void;
  onSearchChange: (value: string) => void;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
};
export type ExpenseTableProps = {
  expenses: Expense[];
  onEdit: (exp: Expense) => void;
  onDelete: (id: string) => void;
};

export type Props = {
  form: Partial<Expense>;
  setForm: React.Dispatch<React.SetStateAction<Partial<Expense>>>;
  categories: string[];
  onClose: () => void;
  onSave: () => void;
};
export type Expense = {
  _id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
};
export interface DeleteConfirmationProps {
  deleteId: string | null;
  onCancel: () => void;
  onConfirm: (id: string) => void;
}