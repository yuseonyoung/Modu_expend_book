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
    '2024-01-01': [
      {
        id: 1,
        category: 'Groceries',
        subCategory: 'Supermarket',
        amount: 125.50,
        icon: faShoppingCart
      }
    ],
    '2024-01-02': [
      {
        id: 2,
        category: 'Groceries',
        subCategory: 'Supermarket',
        amount: 75.20,
        icon: faShoppingCart
      },
      {
        id: 3,
        category: 'Dining',
        subCategory: 'Restaurant',
        amount: 50.30,
        icon: faUtensils
      }
    ]
  };

  const dateKey = selectedDate.toISOString().split('T')[0];
  const dayExpenses = expenses[dateKey] || [];

  return (
    <div className="bg-[#1a1f2e] rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4 text-white">
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
            className="flex items-center justify-between p-4 bg-[#252b3d] rounded-lg hover:bg-[#2f3649] transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[#3b82f6] rounded-full flex items-center justify-center">
                <FontAwesomeIcon icon={expense.icon} className="text-white" />
              </div>
              <div>
                <div className="font-medium text-white">{expense.category}</div>
                <div className="text-sm text-gray-400">{expense.subCategory}</div>
              </div>
            </div>
            <div className="text-lg font-medium text-white">
              ${expense.amount.toFixed(2)}
            </div>
          </div>
        ))}
        {dayExpenses.length === 0 && (
          <div className="text-center text-gray-400 py-4">
            이 날짜의 지출 내역이 없습니다
          </div>
        )}
      </div>
    </div>
  )
}
