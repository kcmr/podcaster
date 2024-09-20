import { render } from '@testing-library/react'
import { ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'

function renderWithRouter(ui: ReactNode, { route = '/' } = {}) {
  window.history.pushState({}, '', route)

  return {
    ...render(ui, { wrapper: BrowserRouter }),
  }
}

export { renderWithRouter as render }
