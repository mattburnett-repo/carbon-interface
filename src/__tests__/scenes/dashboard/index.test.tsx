import React from 'react'
import { render, screen, act } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material'
import { ColorModeContext } from '../../../theme'
import Dashboard from '../../../scenes/dashboard'

const renderWithProviders = () => {
  const theme = createTheme()
  const mockToggleColorMode = jest.fn()

  return render(
    <ColorModeContext.Provider value={{ toggleColorMode: mockToggleColorMode }}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Dashboard />
        </ThemeProvider>
      </BrowserRouter>
    </ColorModeContext.Provider>
  )
}

describe('Dashboard', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('shows loading skeletons initially', () => {
    renderWithProviders()
    const skeletons = screen.getAllByTestId('skeleton')  // We'll add this data-testid
    expect(skeletons).toHaveLength(12)  // 6 cards × 2 skeletons each
  })

  it('has proper accessibility attributes after loading', async () => {
    renderWithProviders()
    
    // Wait for loading to complete
    act(() => {
      jest.advanceTimersByTime(1000)
    })
    
    // Check main content area
    const main = screen.getByRole('main')
    expect(main).toHaveAttribute('aria-label', 'Dashboard')

    // Check heading
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveAttribute('aria-label', 'Carbon Interface API Frontend Dashboard')

    // Check grid container
    const grid = screen.getByRole('grid')
    expect(grid).toHaveAttribute('aria-label', 'Estimate Type Cards')

    // Check cards
    const gridCells = screen.getAllByRole('gridcell')
    expect(gridCells).toHaveLength(6)
    gridCells.forEach(cell => {
      expect(cell).toHaveAttribute('aria-label')
      expect(cell.getAttribute('aria-label')).toMatch(/estimate card$/)
    })

    // Check links are present
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(6)
    links.forEach(link => {
      expect(link).toHaveAttribute('href')
      expect(link.getAttribute('href')).toMatch(/^\/estimates\//)
    })
  })

  it('renders all estimate cards with proper labels after loading', () => {
    renderWithProviders()
    
    // Wait for loading to complete
    act(() => {
      jest.advanceTimersByTime(1000)
    })
    
    const expectedTitles = [
      'Electricity',
      'Flight',
      'Shipping',
      'Vehicle',
      'Fuel Combustion',
      'Show Estimates'
    ]

    expectedTitles.forEach(title => {
      const card = screen.getByText(title)  // Changed from getByLabelText to getByText
      expect(card).toBeInTheDocument()
    })
  })
}) 