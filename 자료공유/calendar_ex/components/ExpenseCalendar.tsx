// ExpenseCalendar.tsx
import React, { useState } from 'react';
import './ExpenseCalendar.css';

interface CategoryExpense {
  amount: string;
  category: string;
}

interface DayExpenses {
  categories: CategoryExpense[];
  total: number;
}

const CATEGORIES = [
  '경조사', '교육', '교통', '문화/여가생활', '술/유흥',
  '식사', '여행/숙박', '육아', '의료/건강', '의복/미용',
  '자동차', '주거/통신', '카페/간식', '미분류'
];

const ExpenseCalendar = () => {
  const [expenses, setExpenses] = useState<Record<string, DayExpenses>>({});
  const [selectedYear] = useState(new Date().getFullYear());
  const [selectedMonth] = useState(new Date().getMonth());
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [tempExpenses, setTempExpenses] = useState<CategoryExpense[]>([]);

  const currentDate = new Date();
  const today = currentDate.getDate();

  const getDaysInMonth = (year: number, month: number) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    return { daysInMonth, firstDay };
  };

  const { daysInMonth, firstDay } = getDaysInMonth(selectedYear, selectedMonth);

  const days = [
    ...Array(firstDay).fill(null),
    ...Array(daysInMonth).fill(0).map((_, i) => i + 1)
  ];

  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  const handleExpenseModalOpen = () => {
    const currentExpenses = expenses[today]?.categories || [];
    setTempExpenses(
      CATEGORIES.map(category => ({
        category,
        amount: currentExpenses.find(e => e.category === category)?.amount || ''
      }))
    );
    setIsExpenseModalOpen(true);
  };

  const handleExpenseChange = (category: string, amount: string) => {
    const numericValue = amount.replace(/[^0-9]/g, '');
    setTempExpenses(prev => 
      prev.map(exp => 
        exp.category === category 
          ? { ...exp, amount: numericValue }
          : exp
      )
    );
  };

  const handleSaveExpenses = () => {
    const total = tempExpenses.reduce(
      (sum, { amount }) => sum + (Number(amount) || 0),
      0
    );

    setExpenses(prev => ({
      ...prev,
      [today]: {
        categories: tempExpenses,
        total
      }
    }));

    setIsExpenseModalOpen(false);
  };

  return (
    <div className="calendar">
      <div className="header">
        <h2>{selectedYear}년 {selectedMonth + 1}월</h2>
      </div>

      <div className="grid">
        {weekDays.map(day => (
          <div key={day} className="weekday">{day}</div>
        ))}
        
        {days.map((day, index) => (
          <div key={index} className={`day ${day === today ? 'today' : ''}`}>
            <div className="day-number">{day}</div>
            {day === today && (
              <button onClick={handleExpenseModalOpen} className="expense-button">
                {expenses[day]?.total 
                  ? `${expenses[day].total.toLocaleString()}원`
                  : '지출 입력'
                }
              </button>
            )}
          </div>
        ))}
      </div>

      {isExpenseModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>오늘의 지출 입력</h3>
            {tempExpenses.map(({ category, amount }) => (
              <div key={category} className="expense-input">
                <label>{category}</label>
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => handleExpenseChange(category, e.target.value)}
                  placeholder="금액"
                />
              </div>
            ))}
            <div className="total">
              총액: {tempExpenses.reduce(
                (sum, { amount }) => sum + (Number(amount) || 0),
                0
              ).toLocaleString()}원
            </div>
            <div className="modal-buttons">
              <button onClick={handleSaveExpenses}>저장</button>
              <button onClick={() => setIsExpenseModalOpen(false)}>취소</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseCalendar;