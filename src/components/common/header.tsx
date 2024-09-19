import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="py-6 mb-6 border-b border-slate-300">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link to="/" className="text-primary-700">
            Podcaster
          </Link>
        </h1>
        [loading]
      </div>
    </header>
  )
}
