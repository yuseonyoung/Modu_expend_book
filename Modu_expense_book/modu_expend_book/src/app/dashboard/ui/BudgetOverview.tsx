interface BudgetOverviewProps {
    isMobile: boolean;
  }
  
  export default function BudgetOverview({ isMobile }: BudgetOverviewProps) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">목표 설정액</h2>
        <div className={`${isMobile ? 'flex flex-col gap-4' : 'space-y-4'}`}>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">총 목표액</span>
            <span className="font-medium">₩300,000</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">사용금액</span>
            <span className="font-medium text-red-500">₩200,000</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">가용금액</span>
            <span className="font-medium text-green-500">₩100,000</span>
          </div>
        </div>
      </div>
    )
  }
  