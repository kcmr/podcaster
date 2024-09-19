import { ApiPodcast, Podcast } from '../types'

export function transformApiPodcastToPodcast(apiPodcast: ApiPodcast): Podcast {
  return {
    id: apiPodcast.id.attributes['im:id'],
    title: apiPodcast['im:name'].label,
    author: apiPodcast['im:artist'].label,
    imageSrc: apiPodcast['im:image'][2].label,
    description: apiPodcast.summary.label,
  }
}
