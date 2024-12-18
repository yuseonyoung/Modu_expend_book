'use client'

import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

export default function CategoryChart() {
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current)
      chart.setOption({
        animation: false,
        title: {
          text: '카테고리별 지출',
          left: 'left'
        },
        tooltip: {
          trigger: 'item'
        },
        series: [{
          type: 'pie',
          radius: ['40%', '70%'],
          data: [
            { value: 35, name: '식비' },
            { value: 25, name: '쇼핑' },
            { value: 20, name: '교통' },
            { value: 15, name: '문화' },
            { value: 5, name: '기타' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
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

