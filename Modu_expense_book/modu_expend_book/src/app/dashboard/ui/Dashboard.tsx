'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Calendar from '@/app/dashboard/ui/Calendar'
import MonthlyOverview from '@/app/dashboard/ui/MonthlyOverview'
/* import CategoryBreakdown from '@/app/dashboard/ui/CategoryBreakdown'*/
import AddExpenseButton from '@/app/dashboard/ui/AddExpenseButton'
import ExpenseListModal from '@/app/dashboard/ui/ExpenseListModal'
import GoalProgress from '@/app/dashboard/ui/GoalProgress'

export default function Dashboard() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });

  const expenseData: Record<string, number> = {
    '2024-12-14': 125.50,
    '2024-12-15': 75.20,
    '2024-12-16': 50.30,
  }

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
  }

  return (
    <div className="w-full h-screen flex flex-col px-0 md:px-4 py-2 md:container md:mx-auto md:px-6 md:py-4">
      <Header />
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-3">
        {/* Calendar - 2열 2행 병합 */}
        <div className="md:col-span-2 md:row-span-2 h-full">
          <Calendar data={expenseData} onDateSelect={handleDateSelect} />
        </div>

        {/* GoalProgress - 3열 1행 */}
        <div className="h-full">
          <GoalProgress
            dailyGoal={300000}
            weeklyGoal={200000}
            monthlyGoal={100000}
          />
        </div>

        {/* MonthlyOverview - 3열 2행 */}
        <div className="h-full">
          <MonthlyOverview />
        </div>


      </div>
      <AddExpenseButton
        onClick={(x, y) => {
          setModalPosition({ x, y });
          setIsModalOpen(true);
        }}
      />
      <ExpenseListModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedDate={selectedDate}
        position={modalPosition}
      />
    </div>
  )
}