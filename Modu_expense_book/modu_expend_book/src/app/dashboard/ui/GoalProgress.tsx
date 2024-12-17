'use client'

interface GoalProgressProps {
  dailyGoal: number;
  weeklyGoal: number;
  monthlyGoal: number;
}

export default function GoalProgress({ dailyGoal, weeklyGoal, monthlyGoal }: GoalProgressProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 h-full flex flex-col">
      {/* 데스크톱 레이아웃 */}
      <div className="hidden md:block">
        <h2 className="text-lg font-bold text-black text-center mb-6">목표 달성률</h2>
        <div className="flex-1 flex flex-col justify-center space-y-6">
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-gray-600">주별 목표 금액</span>
            <span className="font-bold text-black">₩{dailyGoal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-gray-600">이번달 총 사용금액</span>
            <span className="font-bold text-black">₩{weeklyGoal.toLocaleString()}</span>
          </div>

          <div className="h-px bg-red-100"></div>

          <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-gray-600">남은 가용금액</span>
            <span className="font-bold text-black">₩{monthlyGoal.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* 모바일 레이아웃 */}
      <div className="block md:hidden">
        <h2 className="text-base font-bold text-black text-center mb-4">이번달 목표달성률</h2>
        <div className="flex justify-between text-sm font-medium">
          <div className="flex-1 text-center">
            <div className="text-gray-600 mb-1">목표금액</div>
            <div className="font-bold text-black">₩{dailyGoal.toLocaleString()}</div>
          </div>
          <div className="flex-1 text-center">
            <div className="text-gray-600 mb-1">총 사용금액</div>
            <div className="font-bold text-black">₩{weeklyGoal.toLocaleString()}</div>
          </div>
          <div className="flex-1 text-center">
            <div className="text-gray-600 mb-1">남은 가용금액</div>
            <div className="font-bold text-black">₩{monthlyGoal.toLocaleString()}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
