export interface ApiPodcast {
  'im:name': {
    label: string
  }
  'im:image': Array<{
    label: string
    attributes: {
      height: string
    }
  }>
  summary: {
    label: string
  }
  id: {
    label: string
    attributes: {
      'im:id': string
    }
  }
  'im:artist': {
    label: string
    attributes?: {
      href: string
    }
  }
}

export interface ApiPodcastFeed {
  feed: {
    entry: ApiPodcast[]
  }
}

export interface ApiPodcastLookup {
  resultCount: number
  results: [ApiTrack, ...ApiPodcastEpisode[]]
}

export interface ApiTrack {
  wrapperType: 'track'
}

export interface ApiPodcastEpisode {
  wrapperType: 'podcastEpisode'
  collectionName: string
  episodeGuid: string
  description: string
  trackTimeMillis?: number
  trackId: number
  trackName: string
  releaseDate: string
  episodeUrl: string
}
