'use client'

import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { Fragment } from 'react'

interface PeriodSelectWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPeriod: string;
  onPeriodSelect: (period: string) => void;
  position: {
    top: number;
    left: number;
  };
  periods: string[];
}

export function PeriodSelectWidget({
  isOpen,
  onClose,
  selectedPeriod,
  onPeriodSelect,
  position,
  periods
}: PeriodSelectWidgetProps) {
  if (!isOpen) return null;

  const handleButtonClick = (e: React.MouseEvent, period: string) => {
    e.preventDefault();
    e.stopPropagation();
    onPeriodSelect(period);  // 토글 로직은 상위 컴포넌트에서 처리
  };

  return (
    <Fragment>
      <div
        className="fixed inset-0"
        style={{
          zIndex: 99999,
          pointerEvents: 'all'
        }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      />
      <div
        className="fixed bg-white rounded-lg shadow-lg border p-4 period-select-widget"
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
          zIndex: 100000,
          pointerEvents: 'all'
        }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-medium">주기 선택</span>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose();
            }}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {periods.map((period) => (
            <Button
              key={period}
              variant={selectedPeriod === period ? "default" : "outline"}
              className={`h-8 px-2 text-xs rounded-lg ${selectedPeriod === period ? 'bg-blue-500 text-white' : ''
                }`}
              onClick={(e) => handleButtonClick(e, period)}
            >
              {period}
            </Button>
          ))}
        </div>
      </div>
    </Fragment>
  )
}