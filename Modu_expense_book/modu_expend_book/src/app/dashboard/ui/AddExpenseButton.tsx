'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'

interface AddExpenseButtonProps {
  onClick: (x: number, y: number) => void;
}

export default function AddExpenseButton({ onClick }: AddExpenseButtonProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleClick = (e: React.MouseEvent) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = rect.left;
  const y = rect.top;
  setPosition({ x, y });
  onClick(x, y);  // x, y 값을 전달
}

  return (
    <button 
      className="fixed bottom-8 right-8 bg-primary hover:bg-primary/90 text-primary-foreground p-4 rounded-full shadow-lg"
      onClick={handleClick}
    >
      <Plus className="w-6 h-6" />
    </button>
  )
}
