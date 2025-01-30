import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material'
import { ColorModeContext } from '../../../theme'
import Sidebar from '../../../scenes/global/Sidebar'

const renderWithProviders = () => {
  const theme = createTheme()
  const mockToggleColorMode = jest.fn()

  return render(
    <ColorModeContext.Provider value={{ toggleColorMode: mockToggleColorMode }}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Sidebar />
        </ThemeProvider>
      </BrowserRouter>
    </ColorModeContext.Provider>
  )
}

describe('Sidebar', () => {
  it('renders the sidebar with title', () => {
    renderWithProviders()
    expect(screen.getByText('Carbon Interface')).toBeInTheDocument()
  })

  it('toggles collapse state when menu button is clicked', () => {
    renderWithProviders()
    const menuButton = screen.getByTestId('MenuOutlinedIcon').closest('button')
    if (!menuButton) throw new Error('Menu button not found')
    
    expect(screen.queryByText('Carbon Interface')).toBeInTheDocument()
    fireEvent.click(menuButton)
    expect(screen.queryByText('Carbon Interface')).not.toBeInTheDocument()
  })

  it('renders navigation items', () => {
    renderWithProviders()
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Electricity')).toBeInTheDocument()
    expect(screen.getByText('Flight')).toBeInTheDocument()
    expect(screen.getByText('Shipping')).toBeInTheDocument()
  })
})