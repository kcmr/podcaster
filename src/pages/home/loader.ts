import { fetchTopPodcasts } from '@/services/api'
import { usePodcastStore } from '@/store'
import type { Podcast } from '@/types'
import { neverFetchedOrExpired } from '@/utils/data-policies'
import { transformApiPodcastToPodcast } from '@/utils/transformers'

export const loader = async (): Promise<Podcast[]> => {
  const { podcasts, lastFetched, setPodcasts, setLastFetched } =
    usePodcastStore.getState()

  if (neverFetchedOrExpired(lastFetched)) {
    const apiData = await fetchTopPodcasts()
    const podcasts = apiData.feed.entry.map(transformApiPodcastToPodcast)
    setPodcasts(podcasts)
    setLastFetched(Date.now())

    return podcasts
  }

  return podcasts
}
