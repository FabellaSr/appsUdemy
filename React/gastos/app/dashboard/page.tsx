import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { 
  getFamilyMembers, 
  getCategories, 
  getExpenses, 
  getMonthlyStats,
  initializeDefaultCategories
} from "@/lib/actions"
import { DashboardHeader } from "@/components/dashboard-header"
import { MonthSelector } from "@/components/month-selector"
import { StatsCards } from "@/components/stats-cards"
import { ExpenseCharts } from "@/components/expense-charts"
import { FamilyMembersList } from "@/components/family-members-list"
import { ExpensesList } from "@/components/expenses-list"
import { ExpenseForm } from "@/components/expense-form"

interface DashboardPageProps {
  searchParams: Promise<{ month?: string; year?: string }>
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Initialize default categories for new users
  await initializeDefaultCategories()

  const params = await searchParams
  const now = new Date()
  const month = params.month !== undefined ? parseInt(params.month) : now.getMonth()
  const year = params.year !== undefined ? parseInt(params.year) : now.getFullYear()

  const [members, categories, expenses, stats] = await Promise.all([
    getFamilyMembers(),
    getCategories(),
    getExpenses(month, year),
    getMonthlyStats(month, year)
  ])

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader userEmail={user.email || ""} />
      
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Header with month selector and add expense button */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <MonthSelector currentMonth={month} currentYear={year} />
          {members.length > 0 && (
            <ExpenseForm members={members} categories={categories} />
          )}
        </div>

        {/* Stats Cards */}
        <StatsCards 
          totalAmount={stats.totalAmount}
          expenseCount={stats.expenseCount}
          memberCount={members.length}
          categoryCount={categories.length}
        />

        {/* Charts */}
        <ExpenseCharts byMember={stats.byMember} byCategory={stats.byCategory} />

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ExpensesList expenses={expenses} />
          </div>
          <div>
            <FamilyMembersList members={members} />
          </div>
        </div>
      </main>
    </div>
  )
}
