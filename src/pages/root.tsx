import { Outlet, ScrollRestoration, useNavigation } from 'react-router-dom'
import Header from '@/components/common/header'
import { cn } from '@/utils/style'

export default function Root() {
  const navigation = useNavigation()
  const isLoading = navigation.state === 'loading'

  return (
    <main className="container mx-auto mb-12 px-4 max-w-6xl">
      <Header showLoading={isLoading} />
      <div
        className={cn({
          'opacity-50 pointer-events-none': isLoading,
        })}
      >
        <Outlet />
      </div>
      <ScrollRestoration />
    </main>
  )
}
