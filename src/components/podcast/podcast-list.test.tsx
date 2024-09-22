import { render, screen } from '@test-support/react'
import { getMockPodcast, getMockPodcasts } from '@test-support/mocks'
import PodcastList from './podcast-list'

describe('PodcastList', () => {
  it('renders the same number of podcasts as the number of items in the list', () => {
    render(<PodcastList podcasts={getMockPodcasts(3)} />)

    expect(screen.getAllByRole('heading')).toHaveLength(3)
  })

  it('renders the podcast title, author and image', () => {
    const podcast = getMockPodcast({
      id: '123',
      title: 'Awesome Podcast',
      author: 'John Doe',
      imageSrc: 'https://example.com/awesome-podcast.jpg',
    })

    render(<PodcastList podcasts={[podcast]} data-testid="podcast-list" />)

    expect(
      screen.getByRole('heading', { name: podcast.title }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('img', { name: `${podcast.title} cover` }),
    ).toBeInTheDocument()

    expect(screen.getByTestId('podcast-list')).toHaveTextContent(podcast.author)
  })

  it('the podcast title is a link to the podcast page', () => {
    const podcast = getMockPodcast({
      id: '123',
      title: 'Awesome Podcast',
    })

    render(<PodcastList podcasts={[podcast]} />)

    expect(screen.getByRole('link', { name: podcast.title })).toHaveAttribute(
      'href',
      `/podcast/${podcast.id}`,
    )
  })
})
