'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="relative flex justify-between items-center mb-2 px-2 py-1 w-full">
      <div className="flex items-center gap-1">
        <Image
          src="/icon/logo.png"
          alt="Logo"
          width={24}
          height={24}
          className="h-6 w-6"
        />
        <h1 className="text-lg sm:text-2xl font-bold text-black">모두의 가계부</h1>
      </div>
      
      <button 
        className="sm:hidden p-2"
        onClick={() => setIsMenuOpen(true)}
      >
        <Menu className="h-6 w-6 text-black" />
      </button>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
          <div className="flex flex-col h-full">
            <div className="p-4 border-b">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <Image
                    src="/icon/profile.png"
                    alt="Profile"
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <span className="text-xl text-black">유선영</span>
                </div>
                <button onClick={() => setIsMenuOpen(false)} className="p-2">
                  <X className="h-6 w-6 text-black" />
                </button>
              </div>
              <div className="flex gap-2 mt-3">
                <button className="px-4 py-1 text-sm border rounded-full text-black">마이페이지</button>
                <button className="px-4 py-1 text-sm border rounded-full text-black">로그아웃</button>
              </div>
            </div>

            <div className="flex flex-col p-4">
              <a href="#" className="py-3 text-lg text-black flex items-center">
                <span className="w-4 h-4 mr-2">□</span>캠퍼스소개
              </a>
              <a href="#" className="py-3 text-lg text-black flex items-center">
                <span className="w-4 h-4 mr-2">□</span>공지사항
              </a>
              <a href="#" className="py-3 text-lg text-black flex items-center">
                <span className="w-4 h-4 mr-2">□</span>다운로드보관함
              </a>
              <a href="#" className="py-3 text-lg text-black flex items-center">
                <span className="w-4 h-4 mr-2">□</span>다운로드설정
              </a>
              <a href="#" className="py-3 text-lg text-black flex items-center">
                <span className="w-4 h-4 mr-2">□</span>학사정보
              </a>
            </div>

            <div className="mt-auto p-4 bg-gray-50">
              <div className="flex flex-col space-y-4">
                <a href="#" className="text-sm text-black">· 웹 브라우저에서 열기</a>
                <a href="#" className="text-sm text-black">· 자주묻는질문</a>
                <a href="#" className="text-sm text-black">· 문의안내</a>
                <a href="#" className="text-sm text-black">· 이용약관</a>
                <a href="#" className="text-sm text-black">· 개인정보취급방침</a>
                <a href="#" className="text-sm text-black">· English</a>
                <div className="flex items-center">
                  <span className="text-sm text-black">· 방송대학TV</span>
                  <span className="ml-2 px-2 py-0.5 text-xs text-white bg-red-600 rounded">ON-AIR</span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t pt-4">
                <span className="text-sm text-black">푸시알림</span>
                <div className="w-12 h-6 bg-gray-200 rounded-full relative">
                  <div className="w-5 h-5 bg-white rounded-full absolute right-1 top-0.5"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
