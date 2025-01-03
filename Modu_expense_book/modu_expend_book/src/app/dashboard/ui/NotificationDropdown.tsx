'use client'

import * as React from "react"
import { Bell } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface Notification {
  id: string
  message: string
  time: string
  isNew?: boolean
}

export default function NotificationDropdown() {
  const [notifications] = React.useState<Notification[]>([
    {
      id: "1",
      message: "혼자 아침에서21 오늘의 지출을 기록해볼까요?",
      time: "방금 전",
      isNew: true,
    },
    {
      id: "2",
      message: "점심 식사는 맛있게 하셨나요? 서비를 기록해주세요",
      time: "1시간 전",
    },
    {
      id: "3",
      message: "오늘 하루 지출을 정리할 시간이에요",
      time: "3시간 전",
    },
  ])

  return (
    <div className="relative">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="relative w-10 h-10 p-0">
            <Bell className="h-5 w-5" />
            {notifications.some(n => n.isNew) && (
              <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500">
                <span className="sr-only">새로운 알림이 있습니다</span>
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[400px] p-0" align="end" sideOffset={5}>
          <div className="space-y-3 p-4">
            {notifications.map((notification) => (
              <Card 
                key={notification.id} 
                className="bg-gray-50 border-0 shadow-sm"
              >
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">
                          {notification.message}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-500">
                        {notification.time}
                      </p>
                      <div className="flex items-center gap-2">
                        <Button 
                          size="sm" 
                          className="h-7 px-3 text-xs bg-blue-500 hover:bg-blue-600 text-white rounded"
                        >
                          지금 기록하기
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 px-3 text-xs text-gray-500 hover:text-gray-700 hover:bg-transparent"
                        >
                          보기
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}