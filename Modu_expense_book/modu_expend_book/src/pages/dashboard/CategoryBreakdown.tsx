'use client'

import { useEffect, useRef } from 'react'
import * as echarts from 'echarts/core'
import { PieChart } from 'echarts/charts'
import { 
  TooltipComponent, 
  LegendComponent 
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import type { EChartsOption } from 'echarts'

// 필요한 컴포넌트 등록
echarts.use([
  PieChart,
  TooltipComponent,
  LegendComponent,
  CanvasRenderer
])

export default function CategoryBreakdown() {
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current)
      
      const option: EChartsOption = {
        animation: false,
        tooltip: {
          trigger: 'item'
        },
        series: [{
          type: 'pie',
          radius: '70%',
          data: [
            { value: 1048, name: 'Groceries' },
            { value: 735, name: 'Dining' },
            { value: 580, name: 'Transportation' },
            { value: 484, name: 'Entertainment' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      }

      chart.setOption(option)

      const handleResize = () => {
        chart.resize()
      }

      window.addEventListener('resize', handleResize)

      return () => {
        chart.dispose()
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [])

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Category Breakdown</h3>
      <div ref={chartRef} className="h-64"></div>
    </div>
  )
}
