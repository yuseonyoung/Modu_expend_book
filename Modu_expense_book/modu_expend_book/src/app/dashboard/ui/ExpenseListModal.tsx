'use client'

import { X } from 'lucide-react'
import ExpenseList from './ExpenseList'

interface ExpenseListModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedDate: Date | null;
    position: { x: number; y: number };
  }
  
  export default function ExpenseListModal({ isOpen, onClose, selectedDate }: ExpenseListModalProps) {
    if (!isOpen) return null;
  
    return (
      <div 
        className="fixed z-50 animate-modal-open"
        style={{
          right: '1rem',  // 화면 오른쪽 끝에서 1rem 간격
          bottom: '3rem', // + 버튼 위에 위치하도록
          maxWidth: '90vw', // 모바일 대응
          width: '500px'  // 기본 모달 너비
        }}
      >
        <div className="bg-background rounded-lg shadow-lg p-6 w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-foreground">지출 내역</h2>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
              <X size={24} />
            </button>
          </div>
          <ExpenseList selectedDate={selectedDate} />
        </div>
      </div>
    );
  }
  