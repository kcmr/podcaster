import { render, screen } from '@test-support/react'
import type { PodcastEpisode } from '@/types'
import PodcastEpisodes from './podcast-episodes'

const mockEpisode: PodcastEpisode = {
  id: '1',
  title: 'Episode 1',
  description: 'Description 1',
  durationMs: 1000,
  releaseDate: '2021-01-01',
  audioUrl: 'https://example.com/episode1.mp3',
}

function getMockEpisodes(
  count: number,
  props: Partial<PodcastEpisode> = {},
): PodcastEpisode[] {
  return Array.from({ length: count }, (_, index) => ({
    ...mockEpisode,
    ...props,
    id: index.toString(),
    title: `Episode ${index + 1}`,
  }))
}

describe('PodcastEpisodes', () => {
  it('displays a table with title, date and duration columns', () => {
    render(<PodcastEpisodes episodes={[]} />)
    expect(
      screen.getByRole('columnheader', { name: 'Title' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('columnheader', { name: 'Date' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('columnheader', { name: 'Duration' }),
    ).toBeInTheDocument()
  })

  it('displays a table row for each episode', () => {
    render(<PodcastEpisodes episodes={getMockEpisodes(2)} />)
    expect(screen.getAllByRole('row')).toHaveLength(3)
    expect(
      screen.getByRole('cell', {
        name: /episode 1/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('cell', {
        name: /episode 2/i,
      }),
    ).toBeInTheDocument()
  })

  it('links the episode title to the episode page', () => {
    render(<PodcastEpisodes episodes={getMockEpisodes(1)} />)
    expect(
      screen.getByRole('link', {
        name: /episode 1/i,
      }),
    ).toBeInTheDocument()
  })

  it('displays the date of the episode in a human-readable format', () => {
    render(<PodcastEpisodes episodes={getMockEpisodes(1)} />)
    expect(
      screen.getByRole('cell', {
        name: '1/1/2021',
      }),
    ).toBeInTheDocument()
  })

  it('displays the duration of the episode in a human-readable format', () => {
    const fiveMinutesAndThirtySecondsInMs = 330_000
    render(
      <PodcastEpisodes
        episodes={getMockEpisodes(1, {
          durationMs: fiveMinutesAndThirtySecondsInMs,
        })}
      />,
    )
    expect(
      screen.getByRole('cell', {
        name: /5:30/i,
      }),
    ).toBeInTheDocument()
  })

  it('displays N/A if the duration is not available', () => {
    render(
      <PodcastEpisodes episodes={getMockEpisodes(1, { durationMs: null })} />,
    )
    expect(
      screen.getByRole('cell', {
        name: /n\/a/i,
      }),
    ).toBeInTheDocument()
  })
})
