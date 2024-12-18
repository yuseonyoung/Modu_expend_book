'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import MobileNavbar from '@/components/MobileNavbar'


export default function LayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {isMobile && <Header />}
      {!isMobile && <Sidebar />}
      <main className={`
        flex-1 
        ${isMobile ? 'w-full pt-16' : 'ml-20'} 
        p-4 
        md:p-8
      `}>
        <div className="mx-auto max-w-8xl">
          {children}
        </div>
      </main>
      {isMobile && <MobileNavbar />}
    </div>
  )
}
