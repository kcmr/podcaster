import { useParams } from 'react-router-dom'
import { usePodcastDetailStore } from '../../../store'
import PodcastEpisodes from '../../../components/podcast/podcast-episodes'
import Card from '../../../components/common/card'

export default function PodcastDetail() {
  const { podcastId } = useParams<{ podcastId: string }>()
  const podcastDetail = usePodcastDetailStore((state) =>
    state.getPodcastDetail(podcastId!),
  )

  return (
    <>
      <Card>
        <h2 className="text-xl font-bold">
          Episodes: {podcastDetail.episodes.length}
        </h2>
      </Card>
      <PodcastEpisodes episodes={podcastDetail.episodes} />
    </>
  )
}
