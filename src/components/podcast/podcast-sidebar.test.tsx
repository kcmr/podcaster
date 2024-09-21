import { render, screen } from '@test-support/react'
import PodcastSidebar from './podcast-sidebar'
import type { Podcast } from '@/types'

const mockPodcast: Podcast = {
  id: '1',
  title: 'Title',
  author: 'Author',
  imageSrc: 'https://example.com/image.jpg',
  description: 'Description',
}

describe('PodcastSidebar', () => {
  it('displays the podcast cover, title, author, and description', () => {
    render(
      <PodcastSidebar data-testid="podcast-sidebar" podcast={mockPodcast} />,
    )
    const sidebar = screen.getByTestId('podcast-sidebar')

    expect(
      screen.getByRole('img', { name: /title cover/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /title/i })).toBeInTheDocument()
    expect(sidebar).toHaveTextContent(/by author/i)
    expect(sidebar).toHaveTextContent(/description/i)
  })

  it('the cover and title are links to the podcast page', () => {
    render(
      <PodcastSidebar data-testid="podcast-sidebar" podcast={mockPodcast} />,
    )

    const link = screen.getByRole('link', { name: /title/i })

    expect(link).toHaveAttribute('href', `/podcast/${mockPodcast.id}`)
    expect(link).toContainElement(
      screen.getByRole('img', { name: /title cover/i }),
    )
    expect(link).toContainElement(
      screen.getByRole('heading', { name: /title/i }),
    )
  })
})
