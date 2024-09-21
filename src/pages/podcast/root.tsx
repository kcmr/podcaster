import { Outlet, useParams } from 'react-router-dom'
import { usePodcastDetailStore } from '../../store'
import { PodcastSidebar } from '../../components/podcast/podcast-sidebar'

export default function Podcast() {
  const { podcastId } = useParams<{ podcastId: string }>()
  const podcastDetail = usePodcastDetailStore((state) =>
    state.getPodcastDetail(podcastId!),
  )

  return (
    <div className="flex gap-8">
      <PodcastSidebar
        className="w-[230px] flex-shrink-0 self-start"
        podcast={podcastDetail}
      />
      <div className="flex-1 flex flex-col gap-4">
        <Outlet />
      </div>
    </div>
  )
}
