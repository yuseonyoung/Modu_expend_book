interface DailyExpensesProps {
    isMobile: boolean;
    className?: string;
  }
  
  export default function DailyExpenses({ isMobile, className }: DailyExpensesProps) {
    if (isMobile) {
      return (
        <section className="bg-white mt-4 px-4 py-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold">2024년 2월 20일</h2>
            <button className="bg-sky-500 text-white px-3 py-1.5 rounded-lg text-xs hover:bg-opacity-90 transition-all">
              + 지출등록
            </button>
          </div>
          <div className="space-y-4">
            <ExpenseItem
              icon="fa-shopping-bag"
              iconColor="blue"
              title="마트 쇼핑"
              time="12:45"
              amount={44000}
            />
            <ExpenseItem
              icon="fa-utensils"
              iconColor="green"
              title="점심 식사"
              time="12:34"
              amount={15000}
            />
          </div>
        </section>
      )
    }
  
    return (
      <div className={`bg-white p-6 rounded-lg shadow h-full overflow-auto ${className}`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold">2024년 2월 20일</h2>
          <button className="px-4 py-2 bg-sky-400 text-white rounded-lg hover:bg-sky-500 transition-colors text-sm">
            + 지출 등록
          </button>
        </div>
        <div className="space-y-4">
          <ExpenseItem
            icon="fa-shopping-bag"
            iconColor="blue"
            title="마트 쇼핑"
            location="쇼핑마트"
            amount={44000}
          />
          <ExpenseItem
            icon="fa-utensils"
            iconColor="green"
            title="점심 식사"
            location="레스토랑"
            amount={15000}
          />
        </div>
      </div>
    )
  }
  
  interface ExpenseItemProps {
    icon: string;
    iconColor: string;
    title: string;
    time?: string;
    location?: string;
    amount: number;
  }
  
  function ExpenseItem({ icon, iconColor, title, time, location, amount }: ExpenseItemProps) {
    return (
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 bg-${iconColor}-100 rounded-full flex items-center justify-center`}>
            <i className={`fas ${icon} text-${iconColor}-500`}></i>
          </div>
          <div>
            <p className="font-medium">{title}</p>
            {time && <p className="text-sm text-gray-500">{time}</p>}
            {location && <p className="text-sm text-gray-500">{location}</p>}
          </div>
        </div>
        <p className="text-red-500">-{amount.toLocaleString()}원</p>
      </div>
    )
  }
  