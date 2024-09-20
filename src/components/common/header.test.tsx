import { render } from '../../../test-support'
import { screen } from '@testing-library/react'
import Header from './header'

describe('Header', () => {
  it('displays the page title', () => {
    render(<Header />)

    expect(
      screen.getByRole('heading', { name: 'Podcaster' }),
    ).toBeInTheDocument()
  })

  it('the page title is a link to the home page', () => {
    render(<Header />)

    expect(screen.getByRole('link', { name: 'Podcaster' })).toHaveAttribute(
      'href',
      '/',
    )
  })

  it('displays a loading spinner when showLoading is true', () => {
    render(<Header showLoading />)

    expect(screen.getByRole('status', { name: 'Loading…' })).toBeInTheDocument()
  })

  it('does not display a loading spinner when showLoading is false', () => {
    render(<Header />)

    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })
})
