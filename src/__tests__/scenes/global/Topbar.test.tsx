import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider, createTheme } from '@mui/material'
import Topbar from '../../../scenes/global/Topbar'
import { ColorModeContext } from '../../../theme'

const renderWithProviders = (isDarkMode = false) => {
  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light'
    }
  })
  const mockToggleColorMode = jest.fn()

  return {
    ...render(
      <ColorModeContext.Provider value={{ toggleColorMode: mockToggleColorMode }}>
        <ThemeProvider theme={theme}>
          <Topbar />
        </ThemeProvider>
      </ColorModeContext.Provider>
    ),
    mockToggleColorMode
  }
}

describe('Topbar', () => {
  it('renders the theme toggle button', () => {
    renderWithProviders()
    expect(screen.getByTestId('DarkModeOutlinedIcon')).toBeInTheDocument()
  })

  it('renders the portfolio icon', () => {
    renderWithProviders()
    expect(screen.getByAltText('Portfolio Icon')).toBeInTheDocument()
  })

  it('renders portfolio link with correct attributes', () => {
    renderWithProviders()
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', 'https://mattburnett-repo.github.io/portfolio-website/')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('has proper accessibility attributes', () => {
    renderWithProviders()
    
    // Check header banner role and label
    const header = screen.getByRole('banner')
    expect(header).toHaveAttribute('aria-label', 'Top Navigation')

    // Check portfolio link accessibility
    const portfolioLink = screen.getByRole('link')
    expect(portfolioLink).toHaveAttribute('aria-label', 'Visit Portfolio Website')
    expect(portfolioLink).toHaveAttribute('target', '_blank')
    expect(portfolioLink).toHaveAttribute('rel', 'noopener noreferrer')

    // Check theme toggle button accessibility
    const themeButton = screen.getByRole('button')
    expect(themeButton).toHaveAttribute('aria-label', 'Switch to dark mode')
  })

  it('updates theme toggle button label when clicked', () => {
    const { mockToggleColorMode } = renderWithProviders(false) // Start with light mode
    
    const themeButton = screen.getByRole('button')
    expect(themeButton).toHaveAttribute('aria-label', 'Switch to dark mode')
    
    fireEvent.click(themeButton)
    expect(mockToggleColorMode).toHaveBeenCalled()
  })

  it('has proper image alt text', () => {
    renderWithProviders()
    const portfolioIcon = screen.getByAltText('Portfolio Icon')
    expect(portfolioIcon).toBeInTheDocument()
  })
}) 