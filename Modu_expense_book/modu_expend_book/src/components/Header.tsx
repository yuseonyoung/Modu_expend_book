'use client'

import Image from 'next/image'

export default function Header() {
  return (
    <header className="flex justify-between items-center mb-2 px-2 py-1 w-full">
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
      <nav className="flex gap-2 text-xs sm:text-sm">
        <a href="#" className="text-black text-sm sm:text-lg font-bold hover:text-gray-300">Home</a>
        <a href="#" className="text-black text-sm sm:text-lg font-bold hover:text-gray-300">보고서</a>
        <a href="#" className="text-black text-sm sm:text-lg font-bold hover:text-gray-300">마이페이지</a>
      </nav>
    </header>
  )
}
