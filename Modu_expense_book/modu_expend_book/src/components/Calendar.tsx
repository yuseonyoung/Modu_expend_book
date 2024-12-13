'use client'

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader} from '@/components/ui/card';

interface CalendarProps {
  data?: Record<string, number>;
  onDateSelect?: (date: Date, value?: number) => void;
}

interface DayInfo {
  date: Date;
  isCurrentMonth: boolean;
  value?: number;
}

const Calendar = ({ data = {}, onDateSelect }: CalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  
  const formatDateKey = (date: Date): string => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  const getDaysInMonth = (date: Date): DayInfo[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days: DayInfo[] = [];
    
    for (let i = 0; i < firstDay.getDay(); i++) {
      const prevDate = new Date(year, month, -i);
      days.unshift({
        date: prevDate,
        isCurrentMonth: false,
        value: data[formatDateKey(prevDate)]
      });
    }
    
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const currentDate = new Date(year, month, i);
      days.push({
        date: currentDate,
        isCurrentMonth: true,
        value: data[formatDateKey(currentDate)]
      });
    }
    
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const nextDate = new Date(year, month + 1, i);
      days.push({
        date: nextDate,
        isCurrentMonth: false,
        value: data[formatDateKey(nextDate)]
      });
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

  return (
    <Card className="w-full bg-[#1a1f2e] border-none">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center space-x-4">
          <select 
            value={currentDate.getFullYear()}
            onChange={(e) => setCurrentDate(new Date(parseInt(e.target.value), currentDate.getMonth()))}
            className="bg-[#252b3d] text-white border-none rounded-md p-2"
          >
            {[2023, 2024, 2025].map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          <select
            value={currentDate.getMonth()}
            onChange={(e) => setCurrentDate(new Date(currentDate.getFullYear(), parseInt(e.target.value)))}
            className="bg-[#252b3d] text-white border-none rounded-md p-2"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i}>
                {new Date(2024, i).toLocaleString('default', { month: 'long' })}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrevMonth}
            className="p-2 hover:bg-[#252b3d] rounded-full text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-[#252b3d] rounded-full text-white transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1">
          {weekDays.map((day) => (
            <div
              key={day}
              className="text-center py-3 text-sm font-semibold text-gray-400"
            >
              {day}
            </div>
          ))}
          {days.map(({ date, isCurrentMonth, value }, index) => (
            <button
              key={index}
              onClick={() => handleDateClick(date, value)}
              className={`
                p-4 rounded-lg flex flex-col items-start justify-between min-h-[35px]
                ${isCurrentMonth ? 'text-white' : 'text-gray-600'}
                ${selectedDate && date.toDateString() === selectedDate.toDateString()
                  ? 'bg-[#3b82f6]/20 border border-[#3b82f6]'
                  : 'hover:bg-[#252b3d]'}
                transition-colors
              `}
            >
              <span className="text-base font-medium">{date.getDate()}</span>
              {value && (
                <span className="text-sm font-medium text-[#3b82f6] mt-1">
                  ${value.toLocaleString()}
                </span>
              )}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Calendar;
