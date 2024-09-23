import { act, renderHook } from '@testing-library/react'
import { getMockPodcastDetail, getMockPodcasts } from '@test-support/mocks'
import { usePodcastStore, usePodcastDetailStore, useSearchStore } from './index'

describe('Podcast store hooks', () => {
  describe('usePodcastStore()', () => {
    it('sets and gets podcasts', () => {
      const { result } = renderHook(() => usePodcastStore())
      const testPodcasts = getMockPodcasts(1)

      act(() => {
        result.current.setPodcasts(testPodcasts)
      })

      expect(result.current.podcasts).toEqual(testPodcasts)
    })

    it('sets and gets lastFetched', () => {
      const { result } = renderHook(() => usePodcastStore())
      const testTimestamp = Date.now()

      act(() => {
        result.current.setLastFetched(testTimestamp)
      })

      expect(result.current.lastFetched).toBe(testTimestamp)
    })
  })
})

describe('Podcast Detail Store hooks', () => {
  describe('usePodcastDetailStore()', () => {
    it('sets and gets podcast details', () => {
      const { result } = renderHook(() => usePodcastDetailStore())
      const testDetail = getMockPodcastDetail()

      act(() => {
        result.current.setPodcastDetail('1', testDetail)
      })

      expect(result.current.getPodcastDetail('1')).toEqual(testDetail)
    })

    it('gets episode detail', () => {
      const { result } = renderHook(() => usePodcastDetailStore())
      const testEpisode = { id: 'ep1', title: 'Test Episode' }
      const testDetail = getMockPodcastDetail({ episodes: [testEpisode] })

      act(() => {
        result.current.setPodcastDetail('1', testDetail)
      })

      expect(result.current.getEpisodeDetail('1', 'ep1')).toEqual(testEpisode)
    })

    it('sets and gets lastFetched for podcast details', () => {
      const { result } = renderHook(() => usePodcastDetailStore())
      const testTimestamp = Date.now()

      act(() => {
        result.current.setLastFetched('1', testTimestamp)
      })

      expect(result.current.lastFetched['1']).toBe(testTimestamp)
    })
  })
})

describe('Search store hooks', () => {
  describe('useSearchStore()', () => {
    it('sets and gets search term', () => {
      const { result } = renderHook(() => useSearchStore())
      const testTerm = 'test search'

      act(() => {
        result.current.setSearchTerm(testTerm)
      })

      expect(result.current.searchTerm).toBe(testTerm)
    })
  })
})
