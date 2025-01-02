'use client'

import { useState, useEffect } from 'react'
import { ArrowDownIcon, UtensilsIcon, RefreshCwIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from '@/components/ui/dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

interface ExpenseEntryDialogProps {
  buttonStyle: string;
  buttonText: string;
}

export default function ExpenseEntryDialog({ buttonStyle, buttonText }: ExpenseEntryDialogProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [totalAmount, setTotalAmount] = useState<number>(0)
  const [inputValues, setInputValues] = useState<number[]>([0, 0, 0])
  const [selectedCategory, setSelectedCategory] = useState<string>('전체')

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <button className={buttonStyle}>{buttonText}</button>
  }

  const handleAmountChange = (index: number, value: string) => {
    const newValues = [...inputValues]
    newValues[index] = Number(value) || 0
    setInputValues(newValues)
    setTotalAmount(newValues.reduce((sum, current) => sum + current, 0))
  }

  const resetValues = () => {
    setInputValues([0, 0, 0])
    setTotalAmount(0)
    setSelectedCategory('전체')
  }

  return (
    <Dialog onOpenChange={(isOpen) => !isOpen && resetValues()}>
      <DialogTrigger asChild>
        <button type="button" className={buttonStyle}>{buttonText}</button>
      </DialogTrigger>
      <DialogContent className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full bg-white rounded-2xl shadow-lg
        md:max-w-lg md:p-8 md:h-auto
        sm:max-w-[95%] sm:p-4 sm:h-[90vh] sm:overflow-y-auto">
        <VisuallyHidden>
          <DialogTitle>사용자 금액 등록</DialogTitle>
        </VisuallyHidden>
        <div className="text-center mb-4 md:mb-6">
          <p className="text-gray-500 mb-1 md:mb-2 text-sm md:text-base">이번 달 총 지출</p>
          <h2 className="text-2xl md:text-4xl font-bold mb-1 md:mb-2">₩1,250,000</h2>
          <div className="flex justify-center items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-500">
            <span className="text-green-600 flex items-center">
              <ArrowDownIcon className="w-3 h-3 md:w-4 md:h-4 mr-1" />
              전월대비 5.2% 감소
            </span>
            <span>|</span>
            <span>예산 대비 75%</span>
          </div>
        </div>

        <div className="flex gap-1 md:gap-2 mb-4 md:mb-6 overflow-x-auto">
          {['전체', '식비', '교통', '주거', '문화생활'].map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "secondary"}
              className="rounded-full px-3 md:px-4 py-1 md:py-2 text-xs md:text-sm whitespace-nowrap"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
          {[1, 2, 3].map((item, index) => (
            <div key={item} className="flex items-center gap-2 md:gap-4 p-3 md:p-4 border rounded-lg">
              <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-blue-100 rounded-full">
                <UtensilsIcon className="w-4 h-4 md:w-5 md:h-5 text-blue-500" />
              </div>
              <div className="flex-1">
                <span className="text-gray-900 text-sm md:text-base">식비</span>
              </div>
              <div className="flex items-center gap-1 md:gap-2">
                <RefreshCwIcon className="text-gray-500 w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3" />
                <input
                  type="number"
                  className="w-20 md:w-24 px-2 py-1 text-right border rounded-lg text-xs md:text-sm"
                  placeholder="0"
                  value={inputValues[index]}
                  onChange={(e) => handleAmountChange(index, e.target.value)}
                />
                <span className="text-gray-500 text-sm md:text-base">원</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mb-4 md:mb-6">
          <span className="text-gray-900 font-medium text-sm md:text-base">총 지출</span>
          <span className="text-gray-900 font-medium text-sm md:text-base">{totalAmount.toLocaleString()}원</span>
        </div>

        <div className="flex gap-2 md:gap-4">
          <Button className="flex-1 text-sm md:text-base py-2 md:py-3">확인</Button>
          <Button variant="outline" className="flex-1 text-sm md:text-base py-2 md:py-3" onClick={resetValues}>취소</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}