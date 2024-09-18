import { render, screen, fireEvent } from '@testing-library/react'
import Button from './button'

describe('Button', () => {
  it('renders with correct label', () => {
    render(<Button label="Click me" />)

    expect(
      screen.getByRole('button', {
        name: 'Click me',
      }),
    ).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn()
    render(<Button label="Click me" onClick={handleClick} />)

    fireEvent.click(screen.getByRole('button'))

    expect(handleClick).toHaveBeenCalled()
  })
})
