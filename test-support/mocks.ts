import { merge } from 'ts-deepmerge'
import type { DeepPartial } from 'ts-essentials'
import type { Podcast, PodcastDetail } from '@/types'

type Object = Parameters<typeof merge>[0]
type MergeOptions = Parameters<typeof merge.withOptions>[0]

export const getCustomMock =
  <Fixture extends Object>(fixtureTarget: Fixture) =>
  (overrides?: DeepPartial<Fixture>, options?: MergeOptions) => {
    const safeOverrides = overrides ?? {}

    if (options) {
      return merge.withOptions(options, fixtureTarget, safeOverrides) as Fixture
    }

    return merge(fixtureTarget, safeOverrides) as Fixture
  }

const defaultPodcastMock: Podcast = {
  id: '1',
  title: 'Podcast',
  author: 'Author',
  description: 'Description',
  imageSrc: 'https://example.com/podcast.jpg',
}

export const getMockPodcast = getCustomMock<Podcast>(defaultPodcastMock)

export function getMockPodcasts(
  count: number,
  props: Partial<Podcast> = {},
): Podcast[] {
  return Array.from({ length: count }, (_, index) => ({
    ...getMockPodcast({
      ...props,
      id: index.toString(),
      title: `#${index + 1} Podcast`,
    }),
  }))
}

const defaultPodcastDetailMock: PodcastDetail = {
  ...defaultPodcastMock,
  episodes: [],
}

export const getMockPodcastDetail = getCustomMock<PodcastDetail>(
  defaultPodcastDetailMock,
)
