import { render, screen, fireEvent } from '@test-support/react'
import Search from './search'

describe('Search', () => {
  it('renders a search input', () => {
    render(<Search />)

    expect(screen.getByRole('searchbox')).toHaveAttribute('type', 'search')
  })

  it('calls onChange when the input value changes', () => {
    const onChange = vi.fn()
    render(<Search onChange={onChange} />)

    const input = screen.getByRole('searchbox')
    fireEvent.change(input, { target: { value: 'test' } })

    expect(onChange).toHaveBeenCalledWith('test')
  })

  it('uses a default placeholder "Filter…" when no placeholder is provided', () => {
    render(<Search />)

    expect(screen.getByRole('searchbox')).toHaveAttribute(
      'placeholder',
      'Filter…',
    )
  })

  it('uses a provided placeholder when provided', () => {
    render(<Search placeholder="Search…" />)

    expect(screen.getByRole('searchbox')).toHaveAttribute(
      'placeholder',
      'Search…',
    )
  })

  it('appends the provided className to the input', () => {
    render(<Search className="test-class" />)

    expect(screen.getByRole('searchbox')).toHaveClass('test-class')
  })
})
