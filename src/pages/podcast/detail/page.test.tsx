import type { Mock } from 'vitest'
import { Route, Routes, useLoaderData } from 'react-router-dom'
import { render, screen } from '@test-support/react'
import { getMockPodcastDetail } from '@test-support/mocks'
import Podcast from '../root'
import PodcastDetail from './page'

vi.mock('react-router-dom', async (importOriginal) => ({
  ...(await importOriginal()),
  useLoaderData: vi.fn(),
}))

const useLoaderDataMock = useLoaderData as Mock<typeof useLoaderData>

describe('PodcastDetail', () => {
  it('renders a sidebar with the podcast details', () => {
    const podcastDetail = getMockPodcastDetail({
      title: 'Any Podcast',
      author: 'John Doe',
      description: 'Whatever',
    })

    useLoaderDataMock.mockReturnValue(podcastDetail)

    render(
      <Routes>
        <Route path="podcast/:podcastId" element={<Podcast />}>
          <Route index element={<PodcastDetail />} />
        </Route>
      </Routes>,
      { route: '/podcast/1' },
    )

    const sidebarTitle = screen.getByRole('heading', {
      name: podcastDetail.title,
    })

    expect(sidebarTitle.parentElement!).toHaveTextContent(
      `by ${podcastDetail.author}`,
    )

    const descriptionHeading = screen.getByRole('heading', {
      name: /description/i,
    })

    expect(descriptionHeading.parentElement!).toHaveTextContent(
      podcastDetail.description,
    )
  })

  it('renders the list of episodes', () => {
    const podcastDetail = getMockPodcastDetail({
      episodes: [
        {
          id: '1',
          title: 'Episode 1',
          description: 'Whatever',
          durationMs: 60_000,
          releaseDate: '2021-02-05',
          audioUrl: 'https://example.com/episode1.mp3',
        },
      ],
    })

    useLoaderDataMock.mockReturnValue(podcastDetail)

    render(
      <Routes>
        <Route path="podcast/:podcastId" element={<Podcast />}>
          <Route index element={<PodcastDetail />} />
        </Route>
      </Routes>,
      { route: '/podcast/1' },
    )

    expect(
      screen.getByRole('heading', { name: /episodes: 1/i }),
    ).toBeInTheDocument()

    expect(screen.getByRole('cell', { name: /episode 1/i })).toBeInTheDocument()
    expect(screen.getByRole('cell', { name: '2/5/2021' })).toBeInTheDocument()
    expect(screen.getByRole('cell', { name: /1:00/i })).toBeInTheDocument()
  })

  it('each episode title is a link to the episode page', () => {
    const podcastDetail = getMockPodcastDetail({
      episodes: [
        {
          id: '1',
          title: 'Episode 1',
          description: 'Whatever',
          durationMs: 60_000,
          releaseDate: '2021-02-05',
          audioUrl: 'https://example.com/episode1.mp3',
        },
      ],
    })

    useLoaderDataMock.mockReturnValue(podcastDetail)

    render(
      <Routes>
        <Route path="podcast/:podcastId" element={<Podcast />}>
          <Route index element={<PodcastDetail />} />
        </Route>
      </Routes>,
      { route: '/podcast/1' },
    )

    expect(screen.getByRole('link', { name: /episode 1/i })).toBeInTheDocument()
  })
})
