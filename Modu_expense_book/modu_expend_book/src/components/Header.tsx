'use client'

import Image from 'next/image' 

export default function Header() {
  return (
    <header className="flex justify-between items-center mb-4 px-4 py-2 w-full">
      <div className="flex items-center gap-2">
        <Image 
          src="/icon/logo.png" 
          alt="Logo" 
          width={28} 
          height={28}
          className="h-7 w-7"
        /> 
        <h1 className="text-2xl font-bold text-black">모두의 가계부</h1>
      </div>
      <nav className="flex gap-3 text-sm">
        <a href="#" className="text-black text-lg font-bold hover:text-gray-300">Home</a>
        <a href="#" className="text-black text-lg font-bold hover:text-gray-300">보고서</a>
        <a href="#" className="text-black text-lg font-bold hover:text-gray-300">마이페이지</a>
      </nav>
    </header>
  )
}
