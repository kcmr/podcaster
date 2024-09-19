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
