import { render, screen } from '@test-support/react'
import PodcastList from './podcast-list'
import type { Podcast } from '@/types'

const mockPodcast: Podcast = {
  id: '1',
  title: 'Podcast',
  author: 'Author',
  description: 'Description',
  imageSrc: 'https://example.com/podcast.jpg',
}

function getMockPodcasts(
  count: number,
  props: Partial<Podcast> = {},
): Podcast[] {
  return Array.from({ length: count }, (_, index) => ({
    ...mockPodcast,
    ...props,
    id: index.toString(),
    title: `Podcast ${index + 1}`,
  }))
}

describe('PodcastList', () => {
  it('renders the same number of podcasts as the number of items in the list', () => {
    render(<PodcastList podcasts={getMockPodcasts(3)} />)

    expect(screen.getAllByRole('heading')).toHaveLength(3)
  })

  it('renders the podcast title, author and image', () => {
    render(
      <PodcastList podcasts={getMockPodcasts(1)} data-testid="podcast-list" />,
    )

    expect(
      screen.getByRole('heading', { name: /podcast 1/i }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('img', { name: /podcast 1 cover/i }),
    ).toBeInTheDocument()

    expect(screen.getByTestId('podcast-list')).toHaveTextContent(/author/i)
  })

  it('the podcast title is a link to the podcast page', () => {
    render(<PodcastList podcasts={getMockPodcasts(1)} />)

    expect(screen.getByRole('link', { name: /podcast 1/i })).toHaveAttribute(
      'href',
      '/podcast/0',
    )
  })
})
