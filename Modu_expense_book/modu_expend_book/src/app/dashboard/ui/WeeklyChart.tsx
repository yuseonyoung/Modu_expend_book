'use client'

import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

export default function WeeklyChart() {
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current)
      chart.setOption({
        animation: false,
        title: {
          text: '주별 지출현황',
          left: 'left'
        },
        xAxis: {
          type: 'category',
          data: ['1주', '2주', '3주', '4주']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [150000, 220000, 210000, 200000],
          type: 'line',
          smooth: true,
          lineStyle: {
            color: '#6366F1'
          },
          itemStyle: {
            color: '#6366F1'
          }
        }]
      })

      const resizeChart = () => chart.resize()
      window.addEventListener('resize', resizeChart)
      return () => window.removeEventListener('resize', resizeChart)
    }
  }, [])

  return <div ref={chartRef} className="bg-white p-6 rounded-lg shadow h-[280px]" />
}

