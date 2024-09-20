import { Link } from 'react-router-dom'
import Spinner from './spinner'

interface HeaderProps {
  showLoading?: boolean
}

export default function Header({ showLoading }: HeaderProps) {
  return (
    <header className="py-6 mb-6 border-b border-slate-300">
      <div className="mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link to="/" className="text-primary-700">
            Podcaster
          </Link>
        </h1>

        <Spinner
          hidden={!showLoading}
          aria-label="Loading…"
          className="fixed top-4 right-4"
        />
      </div>
    </header>
  )
}
