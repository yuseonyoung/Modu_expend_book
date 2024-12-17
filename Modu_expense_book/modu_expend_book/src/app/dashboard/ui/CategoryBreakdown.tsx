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
            { value: 1048, name: '식비' },
            { value: 735, name: '공과금' },
            { value: 580, name: '보험비' },
            { value: 484, name: '여가생활' }
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
    <div className="widget">
      <h3 className="text-xl font-semibold text-foreground">카테고리별 지출</h3>
      <div ref={chartRef} className="h-44"></div>
    </div>
  )
}
