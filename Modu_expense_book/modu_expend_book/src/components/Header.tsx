'use client'

/* import Image from 'next/image' */

export default function Header() {
  return (
    <header className="flex justify-between items-center mb-8">
      <div className="flex items-center gap-2">
        {/* <Image 
          src="/logo.png" 
          alt="Logo" 
          width={32} 
          height={32}
          className="h-8"
        /> */}

        <h1 className="text-xl font-bold text-white">Household Ledger</h1>
      </div>
      <nav className="flex gap-4">
        <a href="#" className="text-white hover:text-gray-300">Dashboard</a>
        <a href="#" className="text-white hover:text-gray-300">Reports</a>
        <a href="#" className="text-white hover:text-gray-300">Settings</a>
      </nav>
    </header>
  )
}
