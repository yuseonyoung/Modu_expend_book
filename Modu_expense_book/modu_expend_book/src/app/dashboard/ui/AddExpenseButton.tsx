'use client'

import { Plus } from 'lucide-react'

interface AddExpenseButtonProps {
  onClick: (x: number, y: number) => void;
}

export default function AddExpenseButton({ onClick }: AddExpenseButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    onClick(rect.left, rect.top);
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
