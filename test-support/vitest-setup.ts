import * as matchers from '@testing-library/jest-dom/matchers'
import { configure } from '@testing-library/dom'
import { expect } from 'vitest'

configure({
  throwSuggestions: true,
})

expect.extend(matchers)
