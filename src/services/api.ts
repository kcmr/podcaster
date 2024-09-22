import type { ApiPodcastFeed, ApiPodcastLookup } from '@/types'

const TOP_PODCASTS_ENDPOINT = `/api/us/rss/toppodcasts/limit=100/genre=1310/json`
const PODCAST_DETAIL_ENDPOINT = '/api/lookup?id='

export const fetchTopPodcasts = async (): Promise<ApiPodcastFeed> => {
  const response = await fetch(TOP_PODCASTS_ENDPOINT)
  if (!response.ok) throw new Error('Failed to fetch top podcasts')

  return response.json()
}

export const fetchPodcastDetails = async (
  podcastId: string,
): Promise<ApiPodcastLookup> => {
  const response = await fetch(
    `${PODCAST_DETAIL_ENDPOINT}${podcastId}&entity=podcastEpisode`,
  )
  if (!response.ok) throw new Error('Failed to fetch podcast details')

  return response.json()
}
