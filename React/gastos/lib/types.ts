export interface FamilyMember {
  id: string
  user_id: string
  name: string
  avatar_color: string
  created_at: string
}

export interface ExpenseCategory {
  id: string
  user_id: string
  name: string
  icon: string
  color: string
  created_at: string
}

export interface Expense {
  id: string
  user_id: string
  family_member_id: string
  category_id: string | null
  description: string
  amount: number
  expense_date: string
  created_at: string
  family_member?: FamilyMember
  category?: ExpenseCategory
}

export interface ExpenseWithRelations extends Expense {
  family_members: FamilyMember
  expense_categories: ExpenseCategory | null
}
