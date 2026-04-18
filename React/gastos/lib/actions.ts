"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import type { FamilyMember, ExpenseCategory, Expense, ExpenseWithRelations } from "./types"

// Family Members Actions
export async function getFamilyMembers(): Promise<FamilyMember[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("family_members")
    .select("*")
    .order("created_at", { ascending: true })

  if (error) throw error
  return data || []
}

export async function createFamilyMember(name: string, avatarColor: string): Promise<FamilyMember> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) throw new Error("No autenticado")

  const { data, error } = await supabase
    .from("family_members")
    .insert({ name, avatar_color: avatarColor, user_id: user.id })
    .select()
    .single()

  if (error) throw error
  revalidatePath("/dashboard")
  return data
}

export async function deleteFamilyMember(id: string): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase
    .from("family_members")
    .delete()
    .eq("id", id)

  if (error) throw error
  revalidatePath("/dashboard")
}

// Categories Actions
export async function getCategories(): Promise<ExpenseCategory[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("expense_categories")
    .select("*")
    .order("name", { ascending: true })

  if (error) throw error
  return data || []
}

export async function createCategory(name: string, icon: string, color: string): Promise<ExpenseCategory> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) throw new Error("No autenticado")

  const { data, error } = await supabase
    .from("expense_categories")
    .insert({ name, icon, color, user_id: user.id })
    .select()
    .single()

  if (error) throw error
  revalidatePath("/dashboard")
  return data
}

export async function deleteCategory(id: string): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase
    .from("expense_categories")
    .delete()
    .eq("id", id)

  if (error) throw error
  revalidatePath("/dashboard")
}

// Expenses Actions
export async function getExpenses(month?: number, year?: number): Promise<ExpenseWithRelations[]> {
  const supabase = await createClient()
  
  let query = supabase
    .from("expenses")
    .select(`
      *,
      family_members (*),
      expense_categories (*)
    `)
    .order("expense_date", { ascending: false })

  if (month !== undefined && year !== undefined) {
    const startDate = new Date(year, month, 1).toISOString().split('T')[0]
    const endDate = new Date(year, month + 1, 0).toISOString().split('T')[0]
    query = query.gte("expense_date", startDate).lte("expense_date", endDate)
  }

  const { data, error } = await query

  if (error) throw error
  return data || []
}

export async function createExpense(
  familyMemberId: string,
  categoryId: string | null,
  description: string,
  amount: number,
  expenseDate: string
): Promise<Expense> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) throw new Error("No autenticado")

  const { data, error } = await supabase
    .from("expenses")
    .insert({
      family_member_id: familyMemberId,
      category_id: categoryId,
      description,
      amount,
      expense_date: expenseDate,
      user_id: user.id
    })
    .select()
    .single()

  if (error) throw error
  revalidatePath("/dashboard")
  return data
}

export async function deleteExpense(id: string): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase
    .from("expenses")
    .delete()
    .eq("id", id)

  if (error) throw error
  revalidatePath("/dashboard")
}

// Stats
export async function getMonthlyStats(month: number, year: number) {
  const expenses = await getExpenses(month, year)
  
  const totalAmount = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0)
  
  const byMember: Record<string, { name: string; total: number; color: string }> = {}
  const byCategory: Record<string, { name: string; total: number; color: string }> = {}
  
  expenses.forEach(exp => {
    const memberId = exp.family_member_id
    const memberName = exp.family_members?.name || "Desconocido"
    const memberColor = exp.family_members?.avatar_color || "#6b7280"
    
    if (!byMember[memberId]) {
      byMember[memberId] = { name: memberName, total: 0, color: memberColor }
    }
    byMember[memberId].total += Number(exp.amount)
    
    const catId = exp.category_id || "sin-categoria"
    const catName = exp.expense_categories?.name || "Sin categoría"
    const catColor = exp.expense_categories?.color || "#6b7280"
    
    if (!byCategory[catId]) {
      byCategory[catId] = { name: catName, total: 0, color: catColor }
    }
    byCategory[catId].total += Number(exp.amount)
  })
  
  return {
    totalAmount,
    expenseCount: expenses.length,
    byMember: Object.values(byMember),
    byCategory: Object.values(byCategory)
  }
}

// Initialize default categories for new users
export async function initializeDefaultCategories(): Promise<void> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return

  const { data: existing } = await supabase
    .from("expense_categories")
    .select("id")
    .limit(1)

  if (existing && existing.length > 0) return

  const defaultCategories = [
    { name: "Alimentacion", icon: "utensils", color: "#22c55e" },
    { name: "Transporte", icon: "car", color: "#3b82f6" },
    { name: "Servicios", icon: "zap", color: "#f59e0b" },
    { name: "Salud", icon: "heart", color: "#ef4444" },
    { name: "Entretenimiento", icon: "film", color: "#8b5cf6" },
    { name: "Educacion", icon: "book", color: "#06b6d4" },
    { name: "Hogar", icon: "home", color: "#ec4899" },
    { name: "Otros", icon: "more-horizontal", color: "#6b7280" },
  ]

  for (const cat of defaultCategories) {
    await supabase
      .from("expense_categories")
      .insert({ ...cat, user_id: user.id })
  }

  revalidatePath("/dashboard")
}
