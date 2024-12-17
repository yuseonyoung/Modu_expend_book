'use client'
import { useState } from 'react'
import Header from '@/components/Header'
import Calendar from '@/app/dashboard/ui/Calendar'
import MonthlyOverview from '@/app/dashboard/ui/MonthlyOverview'
import CategoryBreakdown from '@/app/dashboard/ui/CategoryBreakdown'
// import AddExpenseButton from '@/app/dashboard/ui/AddExpenseButton'
// import ExpenseListModal from '@/app/dashboard/ui/ExpenseListModal'
import GoalProgress from '@/app/dashboard/ui/GoalProgress'

export default function Dashboard() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  // const [isModalOpen, setIsModalOpen] = useState(false)
  // const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 })
  
  const expenseData: Record<string, number> = {
    '2024-12-16': 1125000,
    '2024-12-17': 75200,
    '2024-12-18': 50300,
  }

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
  }

  return (
    <div className="w-full min-h-screen flex flex-col px-0 md:px-4 py-2 md:container md:mx-auto md:px-6 md:py-4">
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* GoalProgress - 항상 표시 */}
        <div className="min-h-fit">
          <GoalProgress dailyGoal={300000} weeklyGoal={200000} monthlyGoal={100000} />
        </div>
        
        {/* MonthlyOverview - 모바일에서 숨김 */}
        <div className="hidden md:block min-h-[250px]">
          <MonthlyOverview />
        </div>
        
        {/* CategoryBreakdown - 모바일에서 숨김 */}
        <div className="hidden md:block">
          <CategoryBreakdown />
        </div>
        
        {/* Calendar - 항상 표시 */}
        <div className="col-span-1 md:col-span-3 w-full">
          <Calendar data={expenseData} onDateSelect={handleDateSelect} />
        </div>
      </div>
      {/* AddExpenseButton 및 ExpenseListModal은 더 이상 사용되지 않습니다 */}
      {/* 
      <AddExpenseButton
        onClick={(x, y) => {
          setModalPosition({ x, y })
          setIsModalOpen(true)
        }}
      />
      <ExpenseListModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedDate={selectedDate}
        position={modalPosition}
      /> 
      */}
    </div>
  )
}
