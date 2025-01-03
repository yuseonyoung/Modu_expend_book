import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"

export default function ProfileSettings() {
  return (
    <div className="max-w-md mx-auto p-4 bg-white">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-20 h-20 overflow-hidden rounded-full border-2 border-gray-100">
          <Image
            src="/icon/profile_sample.jpg"
            alt="Profile"
            width={80}
            height={80}
            className="w-full h-full object-cover"
            priority
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">킴길동</h2>
            <button className="text-gray-400">
              <PencilIcon className="h-5 w-5" />
            </button>
          </div>
          <p className="text-sm text-green-500">일반회원 회원 멤버십입니다</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="font-medium">개인정보 수정</h3>
          <div className="space-y-2">
            <div className="text-sm text-gray-600">이메일</div>
            <div className="flex gap-2">
              <Input 
                defaultValue="sooyeon.kim@example.com" 
                className="flex-1 bg-gray-50"
              />
              <Button 
                variant="default" 
                className="bg-blue-500 hover:bg-blue-600 text-white px-4"
              >
                변경
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-sm text-gray-600">비밀번호</div>
            <div className="flex gap-2">
              <Input 
                type="password" 
                defaultValue="••••••" 
                className="flex-1 bg-gray-50"
              />
              <Button 
                variant="default" 
                className="bg-blue-500 hover:bg-blue-600 text-white px-4"
              >
                변경
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium">목표 설정</h3>
          <div className="space-y-2">
            <div className="text-sm text-gray-600">나의 목표</div>
            <Input 
              defaultValue="해적왕" 
              className="w-full bg-gray-50"
            />
          </div>
          <div className="space-y-2">
            <div className="text-sm text-gray-600">목표 금액</div>
            <Input 
              defaultValue="₩ 90,000,000" 
              className="w-full bg-gray-50"
            />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium">월별 예산 설정</h3>
          <div className="space-y-2">
            <div className="text-sm text-gray-600">월 지출 제한</div>
            <Input 
              defaultValue="₩ 2,000,000" 
              className="w-full bg-gray-50"
            />
          </div>
        </div>

        <Button 
          className="w-full bg-blue-500 hover:bg-blue-600 text-white h-12 mt-4"
        >
          저장하기
        </Button>
      </div>
    </div>
  )
}

function PencilIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="m15 5 4 4" />
    </svg>
  )
}