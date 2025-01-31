import React from 'react'
import { render, screen } from '@testing-library/react'
import { ThemeProvider, createTheme } from '@mui/material'
import Topbar from '../../../scenes/global/Topbar'
import { ColorModeContext } from '../../../theme'

const renderWithProviders = () => {
  const theme = createTheme()
  const mockToggleColorMode = jest.fn()

  return render(
    <ColorModeContext.Provider value={{ toggleColorMode: mockToggleColorMode }}>
      <ThemeProvider theme={theme}>
        <Topbar />
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

describe('Topbar', () => {
  it('renders the theme toggle button', () => {
    renderWithProviders()
    expect(screen.getByTestId('DarkModeOutlinedIcon')).toBeInTheDocument()
  })

  it('renders the ladder icon', () => {
    renderWithProviders()
    expect(screen.getByAltText('ladder icon')).toBeInTheDocument()
  })

  it('renders portfolio link with correct attributes', () => {
    renderWithProviders()
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', 'https://mattburnett-repo.github.io/portfolio-website/')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })
}) 