'use client'

import BudgetOverview from '@/app/dashboard/ui/BudgetOverview'
import WeeklyChart from '@/app/dashboard/ui/WeeklyChart'
import CategoryChart from '@/app/dashboard/ui/CategoryChart'
import Calendar from '@/app/dashboard/ui/Calendar'
import DailyExpenses from '@/app/dashboard/ui/DailyExpenses'
import { useState, useEffect } from 'react'

export default function Home() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div className={`space-y-6 ${isMobile ? 'pb-24' : ''}`}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <BudgetOverview isMobile={isMobile} />
        <div className="hidden md:block">
          <WeeklyChart />
        </div>
        <div className="hidden md:block">
          <CategoryChart />
        </div>
      </div>
      <div className={`grid grid-cols-1 gap-4 md:grid-cols-3 flex-1 ${isMobile ? 'mb-16' : 'h-[calc(100vh-400px)]'}`}>
        <div className="md:col-span-2 h-full">
          <Calendar isMobile={isMobile} />
        </div>
        <div className="h-full">
          <DailyExpenses isMobile={isMobile} />
        </div>
      </div>
    </div>
  )
}