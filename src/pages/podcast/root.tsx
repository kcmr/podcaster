import { Outlet, useLoaderData } from 'react-router-dom'
import { default as PodcastSidebar } from '@/components/podcast/podcast-sidebar'
import type { PodcastDetail } from '@/types'

export default function Podcast() {
  const podcastDetail = useLoaderData() as PodcastDetail

  return (
    <div className="flex gap-8">
      <PodcastSidebar
        className="w-[230px] flex-shrink-0 self-start"
        podcast={podcastDetail}
      />
      <div className="flex-1 flex flex-col gap-4">
        <Outlet context={{ podcastDetail }} />
      </div>
    </div>
  )
}
