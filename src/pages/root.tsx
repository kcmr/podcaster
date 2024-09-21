import { Outlet, ScrollRestoration, useNavigation } from 'react-router-dom'
import { clsx } from 'clsx'
import { Header } from '@/components'

export default function Root() {
  const navigation = useNavigation()
  const isLoading = navigation.state === 'loading'

  return (
    <main className="container mx-auto mb-12 px-4 max-w-6xl">
      <Header showLoading={isLoading} />
      <div
        className={clsx({
          'opacity-50 pointer-events-none': isLoading,
        })}
      >
        <Outlet />
      </div>
      <ScrollRestoration />
    </main>
  )
}
