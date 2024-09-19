import { ApiPodcastFeed } from '../types'

const TOP_PODCASTS_URL = '/api/us/rss/toppodcasts/limit=100/genre=1310/json'
const PODCAST_DETAIL_URL = '/api/lookup?id='

export const fetchTopPodcasts = async (): Promise<ApiPodcastFeed> => {
  const response = await fetch(TOP_PODCASTS_URL)
  if (!response.ok) throw new Error('Failed to fetch top podcasts')

  const data = await response.json()

  return data
}

export const fetchPodcastDetails = async (podcastId: string) => {
  const response = await fetch(`${PODCAST_DETAIL_URL}${podcastId}`)
  if (!response.ok) throw new Error('Failed to fetch podcast details')

  return response.json()
}
