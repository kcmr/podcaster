import { useParams } from 'react-router-dom'
import { usePodcastDetailStore } from '../../store'
import { PodcastSidebar } from '../../components/podcast/podcast-sidebar'

export default function PodcastDetail() {
  const { podcastId } = useParams<{ podcastId: string }>()
  const podcastDetail = usePodcastDetailStore((state) =>
    state.getPodcastDetail(podcastId!),
  )

  if (!podcastDetail) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex gap-8">
      <PodcastSidebar
        className="w-[230px] flex-shrink-0"
        podcast={podcastDetail}
      />
      <div className="flex-1">
        <h2 className="text-xl font-bold mb-4">
          Episodes: {podcastDetail.episodes.length}
        </h2>
        [EpisodeList]
        {/* <EpisodeList episodes={podcastDetail.episodes} podcastId={podcastId!} /> */}
      </div>
    </div>
  )
}
