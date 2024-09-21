import type { LoaderFunctionArgs } from 'react-router-dom'
import { usePodcastDetailStore } from '@/store'
import type { PodcastEpisode } from '@/types'

export const loader = ({
  params,
}: LoaderFunctionArgs): PodcastEpisode | null => {
  const { podcastId, episodeId } = params
  if (!podcastId || !episodeId) {
    throw new Error('Podcast ID and Episode ID are required')
  }

  const { getPodcastDetail } = usePodcastDetailStore.getState()
  const podcastDetail = getPodcastDetail(podcastId)
  const episode = podcastDetail.episodes.find(
    (episode) => episode.id === episodeId,
  )

  if (!episode) {
    return null
  }

  return episode
}
