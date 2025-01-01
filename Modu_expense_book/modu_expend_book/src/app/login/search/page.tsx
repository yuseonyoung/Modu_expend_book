'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

export default function SearchPage() {
  const [email, setEmail] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const { toast } = useToast()

  const handleFindId = async () => {
    try {
      setIsVerifying(true)
      // API 호출 로직
      toast({
        title: '아이디 찾기 성공',
        description: `회원가입하신 아이디가 이메일로 전송되었습니다.`,
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        title: '오류가 발생했습니다',
        description: '다시 시도해주세요.',
      })
    }
    setIsVerifying(false)
  }

  const handleResetPassword = async () => {
    try {
      setIsVerifying(true)
      // API 호출 로직
      toast({
        title: '비밀번호 초기화 성공',
        description: `초기화된 비밀번호가 이메일로 전송되었습니다.`,
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        title: '오류가 발생했습니다',
        description: '다시 시도해주세요.',
      })
    }
    setIsVerifying(false)
  }

  return (
    <div className="h-[calc(100vh-65px)] grid place-items-center">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">아이디 / 비밀번호 찾기</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="id" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2 gap-1 h-14 bg-transparent">
              <TabsTrigger 
                value="id" 
                className="data-[state=active]:bg-[#0094FF] data-[state=active]:text-white bg-gray-100 text-gray-600 font-medium rounded-lg text-base"
              >
                아이디 찾기
              </TabsTrigger>
              <TabsTrigger 
                value="password" 
                className="data-[state=active]:bg-[#0094FF] data-[state=active]:text-white bg-gray-100 text-gray-600 font-medium rounded-lg text-base"
              >
                비밀번호 찾기
              </TabsTrigger>
            </TabsList>

            <TabsContent value="id">
              <div className="text-gray-700 my-6">
                <h3 className="font-medium mb-3">이메일 인증</h3>
                <p className="text-sm text-gray-600">
                  회원가입시 등록한 이메일을 입력하시면 이메일에서 가입하신 정보를 확인하실 수 있습니다.
                </p>
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <Input
                    type="email"
                    placeholder="이메일 입력"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button 
                  className="w-full bg-[#0094FF] hover:bg-[#0084E5] disabled:bg-[#0094FF]/50 text-white"
                  onClick={handleFindId}
                  disabled={!email || isVerifying}
                >
                  아이디 찾기
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="password">
              <div className="text-gray-700 my-6">
                <h3 className="font-medium mb-3">이메일 인증</h3>
                <p className="text-sm text-gray-600">
                  회원가입시 등록한 이메일을 입력하시면 이메일에서 초기화된 비밀번호를 확인하실 수 있습니다.
                </p>
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <Input
                    type="email"
                    placeholder="이메일 입력"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button 
                  className="w-full bg-[#0094FF] hover:bg-[#0084E5] disabled:bg-[#0094FF]/50 text-white"
                  onClick={handleResetPassword}
                  disabled={!email || isVerifying}
                >
                  비밀번호 초기화
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
