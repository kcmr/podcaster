import { render } from '../../../test-support'
import { screen } from '@testing-library/react'
import Spinner from './spinner'

describe('Spinner', () => {
  it('has a role of status', () => {
    render(<Spinner />)

    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('does not allow to override role', () => {
    render(<Spinner role="invalid" />)

    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('receives additional attributes', () => {
    render(<Spinner aria-label="Loading…" />)

    expect(screen.getByRole('status', { name: 'Loading…' })).toBeInTheDocument()
  })
})
