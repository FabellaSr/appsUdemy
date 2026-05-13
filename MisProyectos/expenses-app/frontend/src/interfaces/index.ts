export type Role = 'ADMIN' | 'MEMBER';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
}

export interface Category {
  id: string;
  name: string;
  color?: string;
}

export interface Expense {
  id: string;
  date: string;
  categoryId: string;
  category?: Category;
  concept: string;
  amount: number;
  userId: string;
  user?: Pick<User, 'id' | 'name'>;
  receiptUrl?: string;
}

export interface MonthlyClose {
  id: string;
  year: number;
  month: number;
  closed: boolean;
  closedAt?: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface ReportSummary {
  totalAmount: number;
  byCategory: { categoryId: string; categoryName: string; total: number; pct: number }[];
  byMember: { userId: string; userName: string; total: number }[];
  recent: Expense[];
}
