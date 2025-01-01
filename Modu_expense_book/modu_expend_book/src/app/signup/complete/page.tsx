'use client'

import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle } from 'lucide-react'

export default function SignupComplete() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-[400px]">
        <CardContent className="pt-6 text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-blue-400" />
          </div>
          
          <h1 className="text-xl font-semibold mb-2">
            회원가입이 완료되었습니다
          </h1>
          <p className="text-gray-500 mb-8">
            환영합니다! 이제 모든 서비스를 이용하실 수 있습니다.
          </p>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </span>
              <span>홍길동</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </span>
              <span>hong@example.com</span>
            </div>
          </div>

          <div className="space-y-3">
            <Button 
              className="w-full" 
              onClick={() => router.push('/login')}
            >
              로그인하기
            </Button>
          </div>

          <p className="text-sm text-gray-500 mt-6">
            문의사항이 있으신가요? <span className="text-blue-500">고객센터</span>를 방문해주세요.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

