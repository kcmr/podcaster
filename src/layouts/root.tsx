import { Outlet } from 'react-router-dom'
import Header from '../components/common/header'

export default function Root() {
  return (
    <main className="container mx-auto mb-12 px-4 max-w-6xl">
      <Header />
      <Outlet />
    </main>
  )
}
