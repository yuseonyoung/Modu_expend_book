'use client'

import { X } from 'lucide-react'
import { ReactNode } from 'react'

interface CommonModalProps {
  isOpen: boolean
  onClose: () => void
  width?: string | number // 너비를 동적으로 설정
  height?: string | number // 높이를 동적으로 설정
  children: ReactNode // 모달 내용
}

export default function CommonModal({ isOpen, onClose, width = '500px', height = 'auto', children }: CommonModalProps) {
  if (!isOpen) return null

  return (
    <div
      className="fixed z-50 animate-modal-open"
      style={{
        right: '1rem', // 화면 오른쪽 끝에서 1rem 간격
        bottom: '3rem', // 화면 아래에서 3rem 간격
        maxWidth: '90vw', // 모바일 대응
        width: width, // 동적 너비
        height: height, // 동적 높이
      }}
    >
      <div className="bg-background rounded-lg shadow-lg p-6 w-full h-full">
        {/* 모달 헤더 */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-foreground">Common Modal</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X size={24} />
          </button>
        </div>

        {/* 모달 내용 */}
        <div className="w-full h-full">{children}</div>
      </div>
    </div>
  )
}

/* 사용방법 */
/* 
    import { useState } from 'react'
import CommonModal from '@/components/CommonModal'

export default function ExamplePage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)} className="p-2 bg-blue-500 text-white rounded">
        모달 열기
      </button>

      <CommonModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} width="600px" height="400px">
        여기 내용 넣으면됨
        <p className="text-lg text-foreground">이것은 공통 모달입니다!</p>
      </CommonModal>
    </div>
  )
}

*/