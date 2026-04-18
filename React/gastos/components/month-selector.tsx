"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
]

interface MonthSelectorProps {
  currentMonth: number
  currentYear: number
}

export function MonthSelector({ currentMonth, currentYear }: MonthSelectorProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const navigateMonth = (direction: "prev" | "next") => {
    let newMonth = currentMonth
    let newYear = currentYear

    if (direction === "prev") {
      if (newMonth === 0) {
        newMonth = 11
        newYear -= 1
      } else {
        newMonth -= 1
      }
    } else {
      if (newMonth === 11) {
        newMonth = 0
        newYear += 1
      } else {
        newMonth += 1
      }
    }

    const params = new URLSearchParams(searchParams.toString())
    params.set("month", newMonth.toString())
    params.set("year", newYear.toString())
    router.push(`/dashboard?${params.toString()}`)
  }

  const goToCurrentMonth = () => {
    const now = new Date()
    const params = new URLSearchParams()
    params.set("month", now.getMonth().toString())
    params.set("year", now.getFullYear().toString())
    router.push(`/dashboard?${params.toString()}`)
  }

  const isCurrentMonth = () => {
    const now = new Date()
    return currentMonth === now.getMonth() && currentYear === now.getFullYear()
  }

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="icon" onClick={() => navigateMonth("prev")}>
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      <div className="min-w-[160px] text-center">
        <span className="font-semibold">
          {MONTHS[currentMonth]} {currentYear}
        </span>
      </div>
      
      <Button variant="outline" size="icon" onClick={() => navigateMonth("next")}>
        <ChevronRight className="h-4 w-4" />
      </Button>

      {!isCurrentMonth() && (
        <Button variant="ghost" size="sm" onClick={goToCurrentMonth}>
          Hoy
        </Button>
      )}
    </div>
  )
}
