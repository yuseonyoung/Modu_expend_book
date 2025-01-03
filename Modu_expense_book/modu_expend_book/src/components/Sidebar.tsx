'use client'

import Link from 'next/link'
import Image from 'next/image'

const menuItems = [
  { icon: 'fa-home', text: '대시보드', href: '/dashboard' },
  { icon: 'fa-chart-bar', text: '통계', href: '/statistics' },
  { icon: 'fa-users', text: '커뮤니티', href: '/community' },
  { icon: 'fa-user', text: '내정보', href: '/profile' }
]

export default function Sidebar() {
  return (
    <nav className="group fixed w-20 h-screen bg-white shadow-lg flex flex-col items-center py-6 transition-all duration-300 hover:w-48 z-50">
      <div className="w-12 h-12 relative mb-8">
        <Image
          src="https://ai-public.creatie.ai/gen_page/logo_placeholder.png"
          alt="Logo"
          fill
          className="object-contain"
          sizes="(max-width: 48px) 100vw"
          priority
        />
      </div>
      
      <div className="flex flex-col space-y-8 flex-1 w-full px-3">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="flex items-center text-gray-400 p-3 hover:bg-indigo-50 rounded-lg"
          >
            <i className={`fas ${item.icon} text-xl min-w-[20px]`} />
            <span className="ml-3 overflow-hidden whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300">
              {item.text}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  )
}