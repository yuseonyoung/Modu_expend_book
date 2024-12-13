'use client'

import { useEffect, useRef } from 'react'
import * as echarts from 'echarts/core'
import { LineChart } from 'echarts/charts'
import { 
  TooltipComponent, 
  GridComponent 
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import type { EChartsOption } from 'echarts'

// 필요한 컴포넌트 등록
echarts.use([
  LineChart,
  TooltipComponent,
  GridComponent,
  CanvasRenderer
])

export default function MonthlyOverview() {
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current)
      
      const option: EChartsOption = {
        animation: false,
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          axisLabel: { color: '#fff' }
        },
        yAxis: {
          type: 'value',
          axisLabel: { color: '#fff' }
        },
        series: [{
          data: [820, 932, 901, 934],
          type: 'line',
          smooth: true,
          lineStyle: { color: '#6366f1' },
          itemStyle: { color: '#6366f1' }
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
    <div className="bg-gray-800 rounded-lg p-6 mb-6">
      <h3 className="text-xl font-semibold mb-4">Monthly Overview</h3>
      <div ref={chartRef} className="h-64"></div>
    </div>
  )
}
