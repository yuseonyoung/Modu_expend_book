'use client'

import { useState } from 'react'
import Header from './Header'
import Calendar from './Calendar'
import ExpenseList from './ExpenseList'
import MonthlyOverview from './MonthlyOverview'
import CategoryBreakdown from './CategoryBreakdown'
import AddExpenseButton from './AddExpenseButton'

export default function Dashboard() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  // 샘플 지출 데이터
  const expenseData: Record<string, number> = {
    '2024-12-14': 125.50,
    '2024-12-15': 75.20,
    '2024-12-16': 50.30,
  }

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
  }
  

  return (
    <div className="container mx-auto px-6 py-8">
      <Header />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Calendar 
            data={expenseData}
            onDateSelect={handleDateSelect}
          />
          <ExpenseList selectedDate={selectedDate} />
        </div>
        <div className="space-y-6">
          <MonthlyOverview />
          <CategoryBreakdown />
        </div>
      </div>
      <AddExpenseButton />
    </div>
  )
}
