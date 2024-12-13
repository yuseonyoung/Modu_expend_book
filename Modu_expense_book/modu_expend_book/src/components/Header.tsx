import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
    return (
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="h-8" />
          <h1 className="text-xl font-bold">Household Ledger</h1>
        </div>
        <nav className="flex gap-4">
          <a href="#" className="hover:text-gray-300">Dashboard</a>
          <a href="#" className="hover:text-gray-300">Reports</a>
          <a href="#" className="hover:text-gray-300">Settings</a>
        </nav>
      </header>
    )
  }