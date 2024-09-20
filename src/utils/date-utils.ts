export const ONE_DAY_MS = 24 * 60 * 60 * 1000
export const ONE_HOUR_IN_SECONDS = 3600
export const ONE_MINUTE_IN_SECONDS = 60
export const ONE_SECOND_IN_MS = 1000

export const isOlderThanOneDay = (lastTimestamp: number | null): boolean => {
  if (!lastTimestamp) return true
  return Date.now() - lastTimestamp > ONE_DAY_MS
}

export const formatDuration = (milliseconds: number): string => {
  const totalSeconds = Math.floor(milliseconds / ONE_SECOND_IN_MS)
  const hours = Math.floor(totalSeconds / ONE_HOUR_IN_SECONDS)
  const minutes = Math.floor(
    (totalSeconds % ONE_HOUR_IN_SECONDS) / ONE_MINUTE_IN_SECONDS,
  )
  const seconds = totalSeconds % ONE_MINUTE_IN_SECONDS

  const formattedTime = new Intl.DateTimeFormat('en', {
    hour: hours > 0 ? 'numeric' : undefined,
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  }).format(new Date(0, 0, 0, hours, minutes, seconds))

  return formattedTime.replace(/^0/, '')
}
