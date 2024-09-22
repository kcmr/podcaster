import { merge } from 'ts-deepmerge'
import type { DeepPartial } from 'ts-essentials'
import type { Podcast } from '@/types'

export const defaultPodcastMock: Podcast = {
  id: '1',
  title: 'Podcast',
  author: 'Author',
  description: 'Description',
  imageSrc: 'https://example.com/podcast.jpg',
}

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
