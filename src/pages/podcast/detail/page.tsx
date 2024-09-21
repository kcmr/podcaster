import { useOutletContext } from 'react-router-dom'
import type { PodcastDetail } from '../../../types'
import PodcastEpisodes from '../../../components/podcast/podcast-episodes'
import Card from '../../../components/common/card'

export default function PodcastDetail() {
  const { podcastDetail } = useOutletContext<{ podcastDetail: PodcastDetail }>()

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
