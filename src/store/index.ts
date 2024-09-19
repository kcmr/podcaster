import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Podcast } from '../types'

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
