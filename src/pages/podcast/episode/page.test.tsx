import type { Mock } from 'vitest'
import { Route, Routes, useLoaderData } from 'react-router-dom'
import { render, screen } from '@test-support/react'
import {
  defaultPodcastEpisodeMock,
  getMockPodcastDetail,
} from '@test-support/mocks'
import Podcast from '../root'
import PodcastEpisode from './page'
import PodcastDetail from '../detail/page'

vi.mock('react-router-dom', async (importOriginal) => ({
  ...(await importOriginal()),
  useLoaderData: vi.fn(),
}))

const useLoaderDataMock = useLoaderData as Mock<typeof useLoaderData>

describe('PodcastEpisode', () => {
  it('displays the episode title and description', () => {
    const episodeDetail = getMockPodcastDetail({
      episodes: [defaultPodcastEpisodeMock],
    })

    useLoaderDataMock
      .mockReturnValueOnce(episodeDetail)
      .mockReturnValueOnce(defaultPodcastEpisodeMock)

    render(
      <Routes>
        <Route path="podcast/:podcastId" element={<Podcast />}>
          <Route index element={<PodcastDetail />} />
          <Route path="episode/:episodeId" element={<PodcastEpisode />} />
        </Route>
      </Routes>,
      { route: '/podcast/1/episode/1' },
    )

    expect(
      screen.getByRole('heading', { name: defaultPodcastEpisodeMock.title }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(defaultPodcastEpisodeMock.description),
    ).toBeInTheDocument()
  })

  it('displays the audio player with the correct source', () => {
    const episodeDetail = getMockPodcastDetail({
      episodes: [defaultPodcastEpisodeMock],
    })

    useLoaderDataMock
      .mockReturnValueOnce(episodeDetail)
      .mockReturnValueOnce(defaultPodcastEpisodeMock)

    const { container } = render(
      <Routes>
        <Route path="podcast/:podcastId" element={<Podcast />}>
          <Route index element={<PodcastDetail />} />
          <Route path="episode/:episodeId" element={<PodcastEpisode />} />
        </Route>
      </Routes>,
      { route: '/podcast/1/episode/1' },
    )

    expect(container.querySelector('audio')).toHaveAttribute(
      'src',
      defaultPodcastEpisodeMock.audioUrl,
    )
  })

  it('displays a message if the episode is not found', () => {
    useLoaderDataMock
      .mockReturnValueOnce(getMockPodcastDetail())
      .mockReturnValueOnce(null)

    render(
      <Routes>
        <Route path="podcast/:podcastId" element={<Podcast />}>
          <Route path="episode/:episodeId" element={<PodcastEpisode />} />
        </Route>
      </Routes>,
      { route: '/podcast/1/episode/1' },
    )

    expect(screen.getByText('Episode not found')).toBeInTheDocument()
  })

  it('the sidebar has a link to the podcast detail page', () => {
    const episodeDetail = getMockPodcastDetail({
      episodes: [defaultPodcastEpisodeMock],
    })

    useLoaderDataMock
      .mockReturnValueOnce(episodeDetail)
      .mockReturnValueOnce(defaultPodcastEpisodeMock)

    render(
      <Routes>
        <Route path="podcast/:podcastId" element={<Podcast />}>
          <Route index element={<PodcastDetail />} />
          <Route path="episode/:episodeId" element={<PodcastEpisode />} />
        </Route>
      </Routes>,
      { route: '/podcast/1/episode/1' },
    )

    expect(
      screen.getByRole('link', {
        name: /go to podcast/i,
      }),
    ).toHaveAttribute('href', `/podcast/${episodeDetail.id}`)
  })
})
