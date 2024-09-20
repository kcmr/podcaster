import {
  formatDuration,
  isOlderThanOneDay,
  ONE_DAY_MS,
  ONE_HOUR_IN_SECONDS,
} from './date-utils'

describe('isOlderThanOneDay', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns true if the timestamp is older than one day', () => {
    const mockDate = new Date('2023-05-01T12:00:00Z')
    vi.setSystemTime(mockDate)

    const twoDaysBeforeMockDate = mockDate.getTime() - 2 * ONE_DAY_MS
    expect(isOlderThanOneDay(twoDaysBeforeMockDate)).toBe(true)
  })

  it('returns false if the timestamp is newer than one day', () => {
    const mockDate = new Date('2023-05-01T12:00:00Z')
    vi.setSystemTime(mockDate)

    const oneHourAgo = mockDate.getTime() - ONE_HOUR_IN_SECONDS * 1000
    expect(isOlderThanOneDay(oneHourAgo)).toBe(false)
  })
})

describe('formatDuration', () => {
  it('formats milliseconds duration < 1 hour as MM:SS', () => {
    const fifteenMinutesInMs = 15 * 60 * 1000
    const formattedDuration = formatDuration(fifteenMinutesInMs)
    expect(formattedDuration).toBe('15:00')
  })

  it('formats milliseconds duration > 1 hour as HH:MM:SS', () => {
    const tenHoursInMs = 10 * 60 * 60 * 1000 + 60 * 1000 + 30 * 1000
    const formattedDuration = formatDuration(tenHoursInMs)
    expect(formattedDuration).toBe('10:01:30')
  })

  it('trims the leading zero from hours if present', () => {
    const oneHourAndTenMinutesInMs = 60 * 60 * 1000 + 10 * 60 * 1000 + 30 * 1000
    const formattedDuration = formatDuration(oneHourAndTenMinutesInMs)
    expect(formattedDuration).toBe('1:10:30')
  })
})
