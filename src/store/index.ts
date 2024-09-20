import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Podcast, PodcastDetail } from '../types'
import { isOlderThanOneDay } from '../utils/date'

interface PodcastStore {
  podcasts: Podcast[]
  setPodcasts: (podcasts: Podcast[]) => void
  lastFetched: number | null
  setLastFetched: (timestamp: number) => void
}

export const usePodcastStore = create(
  persist<PodcastStore>(
    (set) => ({
      podcasts: [],
      setPodcasts: (podcasts) => set({ podcasts }),
      lastFetched: null,
      setLastFetched: (timestamp) => set({ lastFetched: timestamp }),
    }),
    {
      name: 'podcast-storage',
    },
  ),
)

interface PodcastDetailStore {
  podcastDetails: Record<string, PodcastDetail>
  setPodcastDetail: (id: string, detail: PodcastDetail) => void
  getPodcastDetail: (id: string) => PodcastDetail
  lastFetched: Record<string, number>
  setLastFetched: (id: string, timestamp: number) => void
  shouldFetchPodcastDetail: (id: string) => boolean
}

export const usePodcastDetailStore = create(
  persist<PodcastDetailStore>(
    (set, get) => ({
      podcastDetails: {},
      setPodcastDetail: (id, detail) =>
        set((state) => ({
          podcastDetails: {
            ...state.podcastDetails,
            [id]: detail,
          },
        })),
      getPodcastDetail: (id) => get().podcastDetails[id],
      lastFetched: {},
      setLastFetched: (id, timestamp) =>
        set((state) => ({
          lastFetched: {
            ...state.lastFetched,
            [id]: timestamp,
          },
        })),
      shouldFetchPodcastDetail: (id) =>
        isOlderThanOneDay(get().lastFetched[id] ?? 0),
    }),
    {
      name: 'podcast-detail-storage',
    },
  ),
)
