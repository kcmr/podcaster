import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <main className="container mx-auto px-4 max-w-6xl">
      <header className="py-6 mb-6 border-b border-slate-300">
        <h1 className="text-2xl font-bold">
          <a href="/" className="text-primary-700">
            Podcaster
          </a>
        </h1>
      </header>

      <Outlet />
    </main>
  )
}
