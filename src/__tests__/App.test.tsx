import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import App from '../App'

jest.mock('../scenes/global/Sidebar', () => {
  return function MockSidebar() {
    return <div data-testid="sidebar">Sidebar</div>
  }
})

jest.mock('../scenes/global/Topbar', () => {
  return function MockTopbar() {
    return <div data-testid="topbar">Topbar</div>
  }
})

describe('App', () => {
  it('renders main layout components', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )

    expect(screen.getByTestId('sidebar')).toBeInTheDocument()
    expect(screen.getByTestId('topbar')).toBeInTheDocument()
  })
})
