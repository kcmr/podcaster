import { useParams, useOutletContext } from 'react-router-dom'
import { usePodcastDetailStore } from '../../../store'
import type { PodcastDetail } from '../../../types'
import Card from '../../../components/common/card'

export default function PodcastEpisode() {
  const { episodeId } = useParams<{ episodeId: string }>()
  const { podcastDetail } = useOutletContext<{ podcastDetail: PodcastDetail }>()
  const { getEpisodeDetail } = usePodcastDetailStore()

  const episodeDetail = getEpisodeDetail(podcastDetail.id, episodeId!)

  if (!episodeDetail) {
    return <div>Loading episode…</div>
  }

  return (
    <Card className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">{episodeDetail.title}</h2>

      <div dangerouslySetInnerHTML={{ __html: episodeDetail.description }} />

      <audio controls className="w-full" src={episodeDetail.audioUrl}>
        Your browser does not support the audio element.
      </audio>
    </Card>
  )
}
