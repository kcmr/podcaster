import { fetchTopPodcasts } from '../../services/api'
import { usePodcastStore } from '../../store'
import { Podcast } from '../../types'
import { transformApiPodcastToPodcast } from '../../utils/transformers'
import { isOlderThanOneDay } from '../../utils/date-utils'

export const loader = async (): Promise<Podcast[]> => {
  const { podcasts, lastFetched, setPodcasts, setLastFetched } =
    usePodcastStore.getState()

  if (isOlderThanOneDay(lastFetched)) {
    const apiData = await fetchTopPodcasts()
    const podcasts = apiData.feed.entry.map(transformApiPodcastToPodcast)
    setPodcasts(podcasts)
    setLastFetched(Date.now())

    return podcasts
  }

  return podcasts
}
