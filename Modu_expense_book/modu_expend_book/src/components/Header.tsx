export default function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-white border-b border-gray-100 mb-4">
      <div className="flex justify-between items-center px-4 py-3">
        <span className="text-xl font-bold">C</span>
        <button className="text-lg">
          <i className="fas fa-bars"></i>
        </button>
      </div>
    </header>
  )
}

