'use client'
import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/app/dashboard/ui/card';

interface CalendarProps {
  data?: Record<string, number>;
  onDateSelect?: (date: Date, value?: number) => void;
  className?: string;
}

interface DayInfo {
  date: Date;
  isCurrentMonth: boolean;
  value?: number;
}

const Calendar = ({ data = {}, onDateSelect }: CalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  useEffect(() => {
    if (selectedDate) {
      const todayKey = formatDateKey(selectedDate);
      onDateSelect?.(selectedDate, data[todayKey]);
    }
  }, []);


  const formatDateKey = (date: Date): string => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  const getDaysInMonth = (date: Date): DayInfo[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days: DayInfo[] = [];

    // 이전 달의 날짜들을 추가
    for (let i = 0; i < firstDay.getDay(); i++) {
      const prevDate = new Date(year, month, -i);
      days.unshift({
        date: prevDate,
        isCurrentMonth: false,
        value: data[formatDateKey(prevDate)]
      });
    }

    // 현재 달의 날짜들을 추가
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const currentDate = new Date(year, month, i);
      days.push({
        date: currentDate,
        isCurrentMonth: true,
        value: data[formatDateKey(currentDate)]
      });
    }

    // 다음 달의 날짜들을 추가 (마지막 주를 채우기 위해)
    const remainingDays = 7 - (days.length % 7);
    if (remainingDays < 7) {
      for (let i = 1; i <= remainingDays; i++) {
        const nextDate = new Date(year, month + 1, i);
        days.push({
          date: nextDate,
          isCurrentMonth: false,
          value: data[formatDateKey(nextDate)]
        });
      }
    }

    return days;
  };

  const days = getDaysInMonth(currentDate);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  /* const formatDate = (date: Date): string => {
    return `${date.getFullYear()} ${date.toLocaleString('default', { month: 'long' })}`;
  }; */

  const handleDateClick = (date: Date, value?: number) => {
    setSelectedDate(date);
    onDateSelect?.(date, value);
  };
  const currentYear = new Date().getFullYear();
  const yearRange = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);

  return (
    // Calendar.tsx
    <Card className="w-full min-h-[85.5vh] max-h-[85.5vh] border-none widget sm:px-0">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        {/* 헤더 내용 */}
        <div className="flex items-center space-x-4">
          <select
            value={currentDate.getFullYear()}
            onChange={(e) => setCurrentDate(new Date(parseInt(e.target.value), currentDate.getMonth()))}
            className="p-2 hover:bg-secondary rounded-full text-secondary-foreground transition-colors"
            aria-label="연도 선택"
          >
            {yearRange.map(year => (
              <option key={year} value={year}>{year}년</option>
            ))}
          </select>
          <select
            value={currentDate.getMonth()}
            onChange={(e) => setCurrentDate(new Date(currentDate.getFullYear(), parseInt(e.target.value)))}
            className="p-2 hover:bg-secondary rounded-full text-secondary-foreground transition-colors"
            aria-label="월 선택"
          >
            {['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'].map((month, i) => (
              <option key={i} value={i}>{month}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrevMonth}
            className="p-2 bg-sky-400 hover:bg-sky-500 rounded-full text-white transition-colors"
            aria-label="이전 달"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNextMonth}
            className="p-2 bg-sky-400 hover:bg-sky-500 rounded-full text-white transition-colors"
            aria-label="다음 달"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="grid grid-cols-7 gap-1 h-full">
          {weekDays.map((day) => (
            <div key={day} className="py-2 text-sm font-semibold text-muted-foreground pl-2">
              {day}
            </div>
          ))}
          {days.map(({ date, isCurrentMonth, value }, index) => (
            <button
              key={index}
              onClick={() => handleDateClick(date, value)}
              className={`
              p-3 rounded-lg flex flex-col items-start h-[calc(55vh/6)] 
              ${isCurrentMonth ? 'text-foreground' : 'text-muted-foreground'} 
              ${selectedDate && date.toDateString() === selectedDate.toDateString()
                  ? 'bg-[#E6F3FF] border border-[#3b82f6]'
                  : 'hover:bg-[#D6E9FF]'}
              transition-colors
            `}
            >
              <div className="flex flex-col items-start">
                <span className="text-base font-medium">{date.getDate()}</span>
                {value && (
                  <span className="text-sm font-medium text-[#3b82f6] mt-1">
                    ${value.toLocaleString()}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>

  );
};

export default Calendar;
