import { useOutletContext } from 'react-router-dom'
import type { PodcastDetail } from '@/types'
import { Card, PodcastEpisodes } from '@/components'

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
