import {
  transformApiPodcastLookupToPodcastEpisodes,
  transformApiPodcastToPodcast,
} from './transformers'
import type { ApiPodcast, ApiPodcastLookup } from '@/types'

const mockApiPodcast: ApiPodcast = {
  id: { attributes: { 'im:id': '1' }, label: '1' },
  'im:name': { label: 'Podcast' },
  'im:artist': { label: 'Author' },
  'im:image': [
    { label: 'Image 1', attributes: { height: '55' } },
    { label: 'Image 2', attributes: { height: '60' } },
    { label: 'Image 3', attributes: { height: '170' } },
  ],
  summary: { label: 'Description' },
}

const mockApiPodcastLookup: ApiPodcastLookup = {
  resultCount: 2,
  results: [
    {
      wrapperType: 'track',
    },
    {
      wrapperType: 'podcastEpisode',
      collectionName: 'Collection 1',
      episodeGuid: '1',
      episodeUrl: 'https://example.com/episode1',
      trackId: 2,
      trackName: 'Episode 2',
      releaseDate: '2023-04-08T12:00:00Z',
      trackTimeMillis: 3300000,
      description: 'This is episode 2',
    },
    {
      wrapperType: 'podcastEpisode',
      collectionName: 'Collection 2',
      episodeGuid: '2',
      episodeUrl: 'https://example.com/episode2',
      trackId: 3,
      trackName: 'Episode 3',
      releaseDate: '2023-04-08T12:00:00Z',
      description: 'This is episode 3',
    },
  ],
}

describe('transformApiPodcastToPodcast', () => {
  it('transform the response from the API to a podcast object', () => {
    const podcast = transformApiPodcastToPodcast(mockApiPodcast)

    expect(podcast).toEqual(
      expect.objectContaining({
        id: '1',
        title: 'Podcast',
        author: 'Author',
        imageSrc: 'Image 3',
        description: 'Description',
      }),
    )
  })
})

describe('transformApiPodcastLookupToPodcastEpisodes', () => {
  it('transform the response from the API to a podcast episodes object', () => {
    const podcastEpisodes =
      transformApiPodcastLookupToPodcastEpisodes(mockApiPodcastLookup)

    expect(podcastEpisodes).toEqual(
      expect.objectContaining({
        episodes: [
          {
            id: '2',
            title: 'Episode 2',
            description: 'This is episode 2',
            durationMs: 3300000,
            releaseDate: '2023-04-08T12:00:00Z',
            audioUrl: 'https://example.com/episode1',
          },
          {
            id: '3',
            title: 'Episode 3',
            description: 'This is episode 3',
            durationMs: null,
            releaseDate: '2023-04-08T12:00:00Z',
            audioUrl: 'https://example.com/episode2',
          },
        ],
      }),
    )
  })
})
