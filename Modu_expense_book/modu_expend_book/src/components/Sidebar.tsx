import Link from 'next/link'

export default function Sidebar() {
  return (
    <nav className="fixed w-20 h-screen bg-white shadow-lg flex flex-col items-center py-6 space-y-8">
      <div className="w-12 h-12">
        <img src="https://ai-public.creatie.ai/gen_page/logo_placeholder.png" alt="Logo" className="w-full" />
      </div>
      <div className="flex flex-col space-y-8 flex-1">
        <Link href="#" className="text-custom p-3 bg-indigo-50 rounded-lg">
          <i className="fas fa-home text-xl"></i>
        </Link>
        <Link href="#" className="text-gray-400 p-3 hover:bg-indigo-50 rounded-lg">
          <i className="fas fa-chart-bar text-xl"></i>
        </Link>
        <Link href="#" className="text-gray-400 p-3 hover:bg-indigo-50 rounded-lg">
          <i className="fas fa-users text-xl"></i>
        </Link>
        <Link href="#" className="text-gray-400 p-3 hover:bg-indigo-50 rounded-lg">
          <i className="fas fa-list text-xl"></i>
        </Link>
      </div>
      <Link href="#" className="text-gray-400 p-3 hover:bg-indigo-50 rounded-lg">
        <i className="fas fa-bell text-xl"></i>
      </Link>
    </nav>
  )
}
