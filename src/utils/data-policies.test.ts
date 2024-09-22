import { neverFetchedOrExpired } from './data-policies'
import { ONE_DAY_MS } from './date'

describe('neverFetchedOrExpired', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns true if lastFetched is undefined (never fetched)', () => {
    expect(neverFetchedOrExpired(undefined)).toBe(true)
  })

  it('returns true if lastFetched is older than one day (expired)', () => {
    const mockDate = new Date('2023-05-01T12:00:00Z')
    vi.setSystemTime(mockDate)

    const twoDaysBeforeMockDate = mockDate.getTime() - 2 * ONE_DAY_MS
    expect(neverFetchedOrExpired(twoDaysBeforeMockDate)).toBe(true)
  })

  it('returns false if lastFetched is newer than one day', () => {
    const mockDate = new Date('2023-05-01T12:00:00Z')
    vi.setSystemTime(mockDate)

    const oneDayBeforeMockDate = mockDate.getTime() - ONE_DAY_MS
    expect(neverFetchedOrExpired(oneDayBeforeMockDate)).toBe(false)
  })
})
