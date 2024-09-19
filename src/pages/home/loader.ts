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
    const transformedPodcasts = apiData.feed.entry.map(
      transformApiPodcastToPodcast,
    )
    setPodcasts(transformedPodcasts)
    setLastFetched(Date.now())

    return transformedPodcasts
  }

  return podcasts
}
