'use client'

import Image from 'next/image' 

export default function Header() {
  return (
    <header className="flex justify-between items-center mb-8">
      <div className="flex items-center gap-2">
         <Image 
          src="../icon/logo.png" 
          alt="Logo" 
          width={32} 
          height={32}
          className="h-8"
        /> 

        <h1 className="text-xl font-bold text-white">모두의 가계부</h1>
      </div>
      <nav className="flex gap-4">
        <a href="#" className="text-white hover:text-gray-300">Home</a>
        <a href="#" className="text-white hover:text-gray-300">보고서</a>
        <a href="#" className="text-white hover:text-gray-300">마이페이지</a>
      </nav>
    </header>
  )
}
