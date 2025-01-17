import { useState, useEffect } from 'react'
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSunday,
  isSaturday,
  isToday,
  isSameDay,
  addDays
} from 'date-fns'

interface CalendarProps {
  isMobile: boolean;
}

export default function Calendar({ isMobile }: CalendarProps) {
  const today = new Date()
  const currentYear = today.getFullYear()
  const years = Array.from(
    { length: 11 },
    (_, i) => currentYear - 5 + i
  )

  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth() + 1)
  const [currentDate, setCurrentDate] = useState(today)
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  useEffect(() => {
    setCurrentDate(new Date(year, month - 1))
  }, [year, month])

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(monthStart)
  const calendarStart = startOfWeek(monthStart)
  const calendarEnd = endOfWeek(monthEnd)

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd })

  const currentWeekDays = eachDayOfInterval({
    start: startOfWeek(today),
    end: addDays(startOfWeek(today), 6)
  })

  const handleMonthChange = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate)
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1)
    } else {
      newDate.setMonth(newDate.getMonth() + 1)
    }
    setYear(newDate.getFullYear())
    setMonth(newDate.getMonth() + 1)
    setCurrentDate(newDate)
  }

  const getDayClass = (day: Date) => {
    const classes = []
    const isCurrentMonthDay = isSameMonth(day, currentDate)
    const isSelected = selectedDate ? isSameDay(day, selectedDate) : false

    if (!isCurrentMonthDay) {
      classes.push('text-gray-400')
    } else {
      if (isSunday(day)) classes.push('text-red-500')
      if (isSaturday(day)) classes.push('text-blue-500')
    }

    if (isSelected) {
      classes.push('outline outline-1 outline-blue-500')
    }

    return classes.join(' ')
  }

  const handleDateClick = (day: Date) => {
    setSelectedDate(day)
  }

  if (isMobile) {
    return (
      <section className="bg-white mt-4 px-4 py-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-4 mb-4">
          <select
            className="border-none bg-transparent text-sm"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
          >
            {years.map(y => (
              <option key={y} value={y}>{y}년</option>
            ))}
          </select>
          <select
            className="border-none bg-transparent text-sm"
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
              <option key={m} value={m}>{m}월</option>
            ))}
          </select>
          <div className="flex gap-4 ml-auto">
            <button onClick={() => handleMonthChange('prev')} className="text-gray-400">
              <i className="fas fa-chevron-left"></i>
            </button>
            <button onClick={() => handleMonthChange('next')} className="text-gray-400">
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 text-center mb-2">
          <div className="text-red-500 text-sm">일</div>
          <div className="text-sm">월</div>
          <div className="text-sm">화</div>
          <div className="text-sm">수</div>
          <div className="text-sm">목</div>
          <div className="text-sm">금</div>
          <div className="text-blue-500 text-sm">토</div>
        </div>
        <div className="grid grid-cols-7 text-center">
          {isExpanded ? days.map((day, index) => (
            <div
              key={index}
              className={`h-14 relative cursor-pointer ${getDayClass(day)}`}
              onClick={() => handleDateClick(day)}
            >
              <div className="flex flex-col items-center justify-between h-full py-1">
                <div className="relative w-full flex items-center justify-center">
                  {isToday(day) && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="w-6 h-6 rounded-full bg-red-50"></span>
                    </span>
                  )}
                  <span className="relative z-10">
                    {format(day, 'd')}
                  </span>
                </div>
                {format(day, 'd') === '18' && (
                  <div className="text-xs text-red-500">-44,500</div>
                )}
              </div>
            </div>
          )) : currentWeekDays.map((day, index) => (
            <div
              key={index}
              className={`h-14 relative cursor-pointer ${getDayClass(day)}`}
              onClick={() => handleDateClick(day)}
            >
              <div className="flex flex-col items-center justify-between h-full py-1">
                <div className="relative w-full flex items-center justify-center">
                  {isToday(day) && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="w-6 h-6 rounded-full bg-red-50"></span>
                    </span>
                  )}
                  <span className="relative z-10">
                    {format(day, 'd')}
                  </span>
                </div>
                {format(day, 'd') === '18' && (
                  <div className="text-xs text-red-500">-44,500</div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center justify-center w-full"
          >
            <span>{isExpanded ? '접기' : '펼쳐보기'}</span>
            <i className={`fas fa-chevron-${isExpanded ? 'up' : 'down'} ml-1`}></i>
          </button>
        </div>
      </section>
    )
  }

  return (
    <div className="col-span-2 bg-white p-6 rounded-lg shadow h-full">
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-2">
          <select
            className="border rounded-lg px-3 py-1"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
          >
            {years.map(y => (
              <option key={y} value={y}>{y}년</option>
            ))}
          </select>
          <select
            className="border rounded-lg px-3 py-1"
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
              <option key={m} value={m}>{m}월</option>
            ))}
          </select>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => handleMonthChange('prev')}
            className="p-2 hover:bg-gray-100 rounded-lg text-gray-400"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <button
            onClick={() => handleMonthChange('next')}
            className="p-2 hover:bg-gray-100 rounded-lg text-gray-400"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-4">
        <div className="text-center w-full">
          <div className="text-red-500 font-medium mb-4">일</div>
          <div>
            {days.filter((_, i) => i % 7 === 0).map((day, index) => (
              <div
                key={index}
                className={`h-24 relative cursor-pointer p-2 ${getDayClass(day)}`}
                onClick={() => handleDateClick(day)}
              >
                <div className="flex flex-col h-full">
                  <div className="flex flex-col items-start gap-1">
                    <div className="text-left">
                      {isToday(day) ? (
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-50">
                          {format(day, 'd')}
                        </span>
                      ) : (
                        format(day, 'd')
                      )}
                    </div>
                    {format(day, 'd') === '18' && (
                      <div className="text-xs text-red-500">-44,500</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {['월', '화', '수', '목', '금', '토'].map((dayName, dayIndex) => (
          <div key={dayName} className="text-center w-full">
            <div className={`font-medium mb-4 ${dayIndex === 5 ? 'text-blue-500' : ''}`}>
              {dayName}
            </div>
            <div>
              {days.filter((_, i) => i % 7 === dayIndex + 1).map((day, index) => (
                <div
                  key={index}
                  className={`h-24 relative cursor-pointer p-2 ${getDayClass(day)}`}
                  onClick={() => handleDateClick(day)}
                >
                  <div className="flex flex-col h-full">
                    <div className="flex flex-col items-start gap-1">
                      <div className="text-left">
                        {isToday(day) ? (
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-50">
                            {format(day, 'd')}
                          </span>
                        ) : (
                          format(day, 'd')
                        )}
                      </div>
                      {format(day, 'd') === '18' && (
                        <div className="text-xs text-red-500">-44,500</div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}