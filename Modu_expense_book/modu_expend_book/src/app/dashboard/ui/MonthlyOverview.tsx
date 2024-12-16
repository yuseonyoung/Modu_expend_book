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
          axisLabel: { color: '#000' }
        },
        yAxis: {
          type: 'value',
          axisLabel: { color: '#000' }
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
    <div className="widget mb-6">
      <h3 className="text-xl font-semibold mb-4 text-foreground">주별 카테고리별 지출</h3>
      <div ref={chartRef} className="h-64"></div>
    </div>
  )
}
