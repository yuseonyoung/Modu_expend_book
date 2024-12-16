'use client'

interface GoalProgressProps {
  dailyGoal: number;
  weeklyGoal: number;
  monthlyGoal: number;
}

export default function GoalProgress({ dailyGoal, weeklyGoal, monthlyGoal }: GoalProgressProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h2 className="text-xl font-semibold mb-4 text-foreground">목표 달성률</h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-bold text-gray-600">주별 목표 금액</span>
          <span className="font-bold text-black">₩{dailyGoal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm  font-bold text-gray-600">이번달 총 사용금액</span>
          <span className="font-bold text-black">₩{weeklyGoal.toLocaleString()}</span>
        </div>
        
        <div className="h-px bg-red-100 my-2"></div>

        <div className="flex justify-between items-center">
          <span className="text-sm font-bold text-gray-600">남은 가용금액</span>
          <span className="font-bold text-black">₩{monthlyGoal.toLocaleString()}</span>
        </div>
      </div>
    </div>
  )
}