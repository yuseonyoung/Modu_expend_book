'use client'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, X, Home, BarChart, User } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="relative flex justify-between items-center px-6 py-4 w-full bg-white shadow-md">
      {/* 로고 & 제목 */}
      <div className="flex items-center gap-3">
        <Image
          src="/icon/logo.png"
          alt="Logo"
          width={40}
          height={40}
          className="h-10 w-10"
        />
        <h1 className="text-2xl font-bold text-gray-900">모두의 가계부</h1>
      </div>

      {/* 데스크탑 메뉴 */}
      <nav className="hidden md:flex items-center gap-6">
        <a href="#" className="text-gray-700 text-lg font-medium hover:text-blue-500 transition duration-300">
          Home
        </a>
        <a href="#" className="text-gray-700 text-lg font-medium hover:text-blue-500 transition duration-300">
          보고서
        </a>
        <a href="#" className="text-gray-700 text-lg font-medium hover:text-blue-500 transition duration-300">
          마이페이지
        </a>
      </nav>

      {/* 모바일 메뉴 버튼 */}
      <button
        className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition duration-300"
        onClick={() => setIsMenuOpen(true)}
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* 모바일 메뉴 */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col animate-slide-in-left">
          {/* 프로필 섹션 */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-3">
              <div className="w-20 h-20 overflow-hidden rounded-full">
                <Image
                  src="/icon/profile_sample.jpg"
                  alt="Profile"
                  width={60}
                  height={60}
                  className="object-cover w-full h-full"
                />
              </div>
              <span className="text-xl font-semibold text-gray-800">덤블도어</span>
            </div>

            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-md hover:bg-gray-200 transition duration-300"
            >
              <X className="h-6 w-6 text-gray-700" />
            </button>
          </div>

          {/* 모바일 메뉴 링크 */}
          <div className="flex flex-col p-6 space-y-5">
            <a
              href="#"
              className="flex items-center text-lg font-medium text-gray-700 hover:text-blue-500 transition duration-300"
            >
              <Home className="h-5 w-5 mr-3 text-blue-400" />
              Home
            </a>
            <a
              href="#"
              className="flex items-center text-lg font-medium text-gray-700 hover:text-blue-500 transition duration-300"
            >
              <BarChart className="h-5 w-5 mr-3 text-blue-400" />
              보고서
            </a>
            <a
              href="#"
              className="flex items-center text-lg font-medium text-gray-700 hover:text-blue-500 transition duration-300"
            >
              <User className="h-5 w-5 mr-3 text-blue-400" />
              마이페이지
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
