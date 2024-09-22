import { render, screen, fireEvent } from '@test-support/react'
import SearchInput from './search-input'

describe('SearchInput', () => {
  it('renders a search input', () => {
    render(<SearchInput />)

    expect(screen.getByRole('searchbox')).toHaveAttribute('type', 'search')
  })

  it('calls onChange when the input value changes', () => {
    const onChange = vi.fn()
    render(<SearchInput onChange={onChange} />)

    const input = screen.getByRole('searchbox')
    fireEvent.change(input, { target: { value: 'test' } })

    expect(onChange).toHaveBeenCalledWith('test')
  })

  it('uses a default placeholder "Filter…" when no placeholder is provided', () => {
    render(<SearchInput />)

    expect(screen.getByRole('searchbox')).toHaveAttribute(
      'placeholder',
      'Filter…',
    )
  })

  it('uses the provided placeholder', () => {
    render(<SearchInput placeholder="Search…" />)

    expect(screen.getByRole('searchbox')).toHaveAttribute(
      'placeholder',
      'Search…',
    )
  })

  it('appends the provided className to the input', () => {
    render(<SearchInput className="test-class" />)

    expect(screen.getByRole('searchbox')).toHaveClass('test-class')
  })
})
