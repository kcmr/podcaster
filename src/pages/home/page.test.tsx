import type { Mock } from 'vitest'
import { Route, Routes, useLoaderData } from 'react-router-dom'
import { fireEvent, render, screen } from '@test-support/react'
import { getMockPodcast, getMockPodcasts } from '@test-support/mocks'
import { useSearchStore } from '@/store'
import Home from './page'

vi.mock('react-router-dom', async (importOriginal) => ({
  ...(await importOriginal()),
  useLoaderData: vi.fn(),
}))

const useLoaderDataMock = useLoaderData as Mock<typeof useLoaderData>

describe('Home', () => {
  beforeEach(() => {
    useSearchStore.setState({ searchTerm: '' })
  })

  it('typing in the search input filters the list of podcasts', () => {
    useLoaderDataMock.mockReturnValue(getMockPodcasts(8))

    render(
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>,
    )

    expect(screen.getAllByRole('heading')).toHaveLength(8)

    fireEvent.change(screen.getByRole('searchbox'), {
      target: { value: '#1 Podcast' },
    })

    expect(screen.getAllByRole('heading', { name: /podcast/i })).toHaveLength(1)
  })

  it('renders a list of podcast with the same number of items returned by the data loader', () => {
    useLoaderDataMock.mockReturnValue(getMockPodcasts(10))

    render(
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>,
    )

    expect(screen.getAllByRole('heading')).toHaveLength(10)
  })

  it('each podcast has the correct title, author and image', () => {
    useLoaderDataMock.mockReturnValue([
      getMockPodcast({
        id: '123',
        title: 'Awesome Podcast',
        author: 'John Doe',
        imageSrc: 'https://example.com/awesome-podcast.jpg',
      }),
    ])

    render(
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>,
    )

    expect(
      screen.getByRole('heading', { name: 'Awesome Podcast' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('img', { name: 'Awesome Podcast cover' }),
    ).toHaveAttribute('src', 'https://example.com/awesome-podcast.jpg')
    expect(screen.getByRole('paragraph')).toHaveTextContent(/John Doe/i)
  })

  it('the podcast title is a link to the podcast page', () => {
    useLoaderDataMock.mockReturnValue([
      getMockPodcast({
        id: '123',
        title: 'Awesome Podcast',
      }),
    ])

    render(
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>,
    )

    expect(
      screen.getByRole('link', { name: 'Awesome Podcast' }),
    ).toHaveAttribute('href', '/podcast/123')
  })
})
