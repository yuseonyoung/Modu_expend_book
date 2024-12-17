'use client'

import { useEffect, useRef } from 'react'
import * as echarts from 'echarts/core'
import { LineChart } from 'echarts/charts'
import {
  TooltipComponent,
  GridComponent,
  TitleComponent,
  AxisPointerComponent
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import type { EChartsOption } from 'echarts'

// Register necessary components
echarts.use([
  LineChart,
  TooltipComponent,
  GridComponent,
  TitleComponent,
  AxisPointerComponent,
  CanvasRenderer
])

export default function MonthlyOverview() {
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current)

      const option: EChartsOption = {
        animation: false,
        title: {
          text: '한달의 주간 지출',
          left: 'center',
          textStyle: {
            color: '#000',
            fontWeight: 'bold',
            fontSize: 16
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: { 
          type: 'category',
          data: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          axisLabel: { color: '#000' },
          name: '주차',
          nameLocation: 'end',
          nameTextStyle: {
            color: '#000',
            fontSize: 14
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: { color: '#000' },
          name: '금액',
          nameLocation: 'end',
          nameTextStyle: {
            color: '#000',
            fontSize: 14
          }
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
    <div className="bg-white rounded-lg shadow-sm p-4 h-full">
      <div ref={chartRef} className="h-full" />
    </div>
  )
}