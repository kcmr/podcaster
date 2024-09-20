import { formatDuration } from './date-utils'

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
