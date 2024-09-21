import type { LoaderFunctionArgs } from 'react-router-dom'
import { fetchPodcastDetails } from '@/services/api'
import { usePodcastDetailStore, usePodcastStore } from '@/store'
import { transformApiPodcastLookupToPodcastEpisodes } from '@/utils/transformers'

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { podcastId } = params
  if (!podcastId) throw new Error('Podcast ID is required')

  const {
    getPodcastDetail,
    setPodcastDetail,
    setLastFetched,
    shouldFetchPodcastDetail,
  } = usePodcastDetailStore.getState()
  const { podcasts } = usePodcastStore.getState()

  if (shouldFetchPodcastDetail(podcastId)) {
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
