import { isOlderThanOneDay } from './date'

export const neverFetchedOrExpired = (
  lastFetched: number | undefined | null,
) => {
  if (!lastFetched) return true

  return isOlderThanOneDay(lastFetched)
}
