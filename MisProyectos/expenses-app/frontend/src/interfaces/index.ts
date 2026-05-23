export type Role = 'ADMIN' | 'MEMBER';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
}
export interface Member extends User {}

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

export interface ExpensesFormDialog {
    open: boolean;
    expense: Expense;
    onOpenChange: (open: boolean) => void;
    categories: Category[];
    onCreated: () => Promise<void>;

}

export const ROLES: Role[] = [
  'ADMIN',
  'MEMBER',
];
export interface MemberFormDialog {
  title: string;
  subTitle: string;
  onOpenChange: (open: boolean) => void; 
  member: Member;
  isPending: boolean;

}

export interface MemberFormProps {
  title: string;
  subTitle: string;
  member: Member;
  isPending: boolean;
  // Methods
  onOpenChange: (open: boolean) => void; 
  onSubmit: (memberLike: Partial<Member>) => Promise<void>;
}