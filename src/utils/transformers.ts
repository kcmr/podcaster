import { ApiPodcast, ApiPodcastLookup, Podcast, PodcastDetail } from '../types'

export function transformApiPodcastToPodcast(apiPodcast: ApiPodcast): Podcast {
  return {
    id: apiPodcast.id.attributes['im:id'],
    title: apiPodcast['im:name'].label,
    author: apiPodcast['im:artist'].label,
    imageSrc: apiPodcast['im:image'][2].label,
    description: apiPodcast.summary.label,
  }
}

export function transformApiPodcastLookupToPodcastEpisodes(
  apiPodcastLookup: ApiPodcastLookup,
): Pick<PodcastDetail, 'episodes'> {
  // omit the first element (track)
  const [, ...episodes] = apiPodcastLookup.results

  return {
    episodes: episodes.map((episode) => ({
      id: episode.trackId.toString(),
      title: episode.trackName,
      description: episode.description,
      durationMs: episode.trackTimeMillis ?? null,
      releaseDate: episode.releaseDate,
      audioUrl: episode.episodeUrl,
    })),
  }
}
