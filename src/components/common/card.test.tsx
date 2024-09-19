import { render, screen } from '@testing-library/react'

import Card from './card'

describe('Card', () => {
  it('renders the content passed as children', () => {
    render(<Card>Card content</Card>)

    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('applies the expected styles when hoverAnimation is true', () => {
    render(<Card hoverAnimation data-testid="card" />)

    expect(screen.getByTestId('card')).toHaveClass(
      'hover:shadow-lg',
      'hover:shadow-slate-300',
      'transition-shadow',
      'duration-300',
    )
  })

  it('appends the provided className', () => {
    render(<Card className="text-red-500" data-testid="card" />)

    expect(screen.getByTestId('card')).toHaveClass('text-red-500')
  })
})
