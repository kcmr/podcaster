import { useParams } from 'react-router-dom'
import { usePodcastDetailStore } from '../../store'
import { PodcastSidebar } from '../../components/podcast/podcast-sidebar'
import PodcastEpisodes from '../../components/podcast/podcast-episodes'
import Card from '../../components/common/card'

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
      <div className="flex-1 flex flex-col gap-4">
        <Card>
          <h2 className="text-xl font-bold">
            Episodes: {podcastDetail.episodes.length}
          </h2>
        </Card>
        <PodcastEpisodes episodes={podcastDetail.episodes} />
      </div>
    </div>
  )
}
