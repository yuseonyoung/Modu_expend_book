'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faUtensils } from '@fortawesome/free-solid-svg-icons'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

interface ExpenseListProps {
  selectedDate: Date | null;
}

interface Expense {
  id: number;
  category: string;
  subCategory: string;
  amount: number;
  icon: IconDefinition;
}

export default function ExpenseList({ selectedDate }: ExpenseListProps) { 
  if (!selectedDate) return null;

  // 샘플 지출 데이터
  const expenses: Record<string, Expense[]> = {
    '2024-12-15': [
      {
        id: 1,
        category: '식비',
        subCategory: '홈플러스',
        amount: 125.50,
        icon: faShoppingCart
      }
    ],
    '2024-12-16': [
      {
        id: 2,
        category: '식비',
        subCategory: '이마트',
        amount: 75.20,
        icon: faShoppingCart
      },
      {
        id: 3,
        category: '누오보나폴리',
        subCategory: '레스토랑',
        amount: 50.30,
        icon: faUtensils
      }
    ]
  };

  const dateKey = selectedDate.toISOString().split('T')[0];
  const dayExpenses = expenses[dateKey] || [];

  return (
    <div className="widget">
      <h3 className="text-xl font-semibold mb-4 text-foreground">
        {selectedDate.toLocaleDateString('ko-KR', {
          weekday: 'short',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </h3>
      <div className="space-y-4">
        {dayExpenses.map((expense) => (
          <div 
            key={expense.id}
            className="flex items-center justify-between p-4 bg-[#E6F3FF] rounded-lg hover:bg-[#D6E9FF] transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <FontAwesomeIcon icon={expense.icon} className="text-white" />
              </div>
              <div>
                <div className="font-bold text-foreground">{expense.category}</div>
                <div className="text-sm text-muted-foreground">{expense.subCategory}</div>
              </div>
            </div>
            <div className="text-lg font-bold text-foreground">
              ${expense.amount.toFixed(2)}
            </div>
          </div>
        ))}
        {dayExpenses.length === 0 && (
          <div className="text-center text-muted-foreground py-4">
            이 날짜의 지출 내역이 없습니다
          </div>
        )}
      </div>
    </div>
  )
}
