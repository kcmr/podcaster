import type { LoaderFunctionArgs } from 'react-router-dom'
import { fetchPodcastDetails } from '@/services/api'
import { usePodcastDetailStore, usePodcastStore } from '@/store'
import { transformApiPodcastLookupToPodcastEpisodes } from '@/utils/transformers'
import { neverFetchedOrExpired } from '@/utils/data-policies'

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { podcastId } = params
  if (!podcastId) throw new Error('Podcast ID is required')

  const { getPodcastDetail, setPodcastDetail, setLastFetched, lastFetched } =
    usePodcastDetailStore.getState()
  const { podcasts } = usePodcastStore.getState()

  if (neverFetchedOrExpired(lastFetched[podcastId])) {
    const apiData = await fetchPodcastDetails(podcastId)
    const episodes = transformApiPodcastLookupToPodcastEpisodes(apiData)
    const detail = podcasts.find(({ id }) => id === podcastId)!
    const podcastDetail = {
      ...detail,
      ...episodes,
    }

    setPodcastDetail(podcastId, podcastDetail)
    setLastFetched(podcastId, Date.now())

    return podcastDetail
  }

  return getPodcastDetail(podcastId)
}
