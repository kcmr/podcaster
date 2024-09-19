const ONE_DAY_MS = 24 * 60 * 60 * 1000

export const isOlderThanOneDay = (lastTimestamp: number | null): boolean => {
  if (!lastTimestamp) return true
  return Date.now() - lastTimestamp > ONE_DAY_MS
}
