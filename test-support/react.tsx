/* eslint-disable no-restricted-imports */
import { render, screen, fireEvent, within } from '@testing-library/react'
import type { ReactNode } from 'react'
import { MemoryRouter } from 'react-router-dom'

function renderWithRouter(ui: ReactNode, { route = '/' } = {}) {
  return {
    ...render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>),
  }
}

export { renderWithRouter as render, screen, fireEvent, within }
