import { useLoaderData } from 'react-router-dom'
import Card from '../../../components/common/card'
import type { PodcastEpisode } from '../../../types'

export default function PodcastEpisode() {
  const episode = useLoaderData() as PodcastEpisode | null

  if (!episode) {
    return <div>Episode not found</div>
  }

  return (
    <Card className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">{episode.title}</h2>

      <div dangerouslySetInnerHTML={{ __html: episode.description }} />

      <audio controls src={episode.audioUrl} className="w-full">
        Your browser does not support the audio element.
      </audio>
    </Card>
  )
}
