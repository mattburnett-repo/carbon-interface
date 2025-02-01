import React from 'react'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
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
  afterEach(() => {
    cleanup()
    jest.clearAllTimers()
  })

  it('renders the sidebar with title', () => {
    renderWithProviders()
    expect(screen.getByText('Carbon Interface')).toBeInTheDocument()
  })

  it('toggles collapse state when menu button is clicked', () => {
    renderWithProviders()
    
    // Initially not collapsed - menu icon should not be visible and headings should be visible
    expect(screen.queryByTestId('MenuOutlinedIcon')).not.toBeInTheDocument()
    expect(screen.getByText('Carbon Interface')).toBeVisible()
    expect(screen.getByText('Estimates')).toBeVisible()
    expect(screen.queryByRole('separator')).not.toBeInTheDocument()
    
    // Find and click the collapse toggle
    const collapseToggle = screen.getByRole('button', { name: 'Carbon Interface' })
    fireEvent.click(collapseToggle)
    
    // After collapse - menu icon should be visible, headings should be hidden, and divider should be visible
    expect(screen.getByTestId('MenuOutlinedIcon')).toBeVisible()
    expect(screen.queryByText('Carbon Interface')).not.toBeInTheDocument()
    expect(screen.queryByText('Estimates')).not.toBeInTheDocument()
    expect(screen.getByRole('separator')).toBeInTheDocument()
  })

  it('renders navigation items', () => {
    renderWithProviders()
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Electricity')).toBeInTheDocument()
    expect(screen.getByText('Flight')).toBeInTheDocument()
    expect(screen.getByText('Shipping')).toBeInTheDocument()
  })

  it('shows tooltips only when sidebar is collapsed', () => {
    renderWithProviders()
    
    // Initially not collapsed - tooltips should be disabled
    const items = screen.getAllByRole('listitem').slice(1) // Skip the first menu item (collapse toggle)
    items.forEach(item => {
      const tooltip = item.querySelector('[role="tooltip"]')
      expect(tooltip).toBeFalsy()
    })
    
    // Collapse the sidebar
    const collapseToggle = screen.getByRole('button', { name: 'Carbon Interface' })
    fireEvent.click(collapseToggle)
    
    // After collapse - tooltips should be enabled
    items.forEach(item => {
      expect(item).toHaveAttribute('data-mui-internal-clone-element')
      // We can't directly test for the tooltip since it only appears on hover
      // but the data-mui-internal-clone-element attribute indicates the tooltip is enabled
    })
  })

  it('has proper accessibility attributes', () => {
    renderWithProviders()
    
    // Check main navigation role and label
    const nav = screen.getByTestId('sidebar-nav')
    expect(nav).toHaveAttribute('role', 'navigation')
    expect(nav).toHaveAttribute('aria-label', 'Main Navigation')

    // Check menu items have proper accessibility attributes
    const menuItems = screen.getAllByRole('menuitem')
    menuItems.forEach(item => {
      expect(item).toHaveAttribute('aria-label')
      expect(item).toHaveAttribute('tabindex', '0')
    })

    // Check links have descriptive labels
    const links = screen.getAllByRole('link')
    links.forEach(link => {
      expect(link).toHaveAttribute('aria-label')
      expect(link.getAttribute('aria-label')).toMatch(/Navigate to/)
    })
  })

  it('maintains accessibility when collapsed', () => {
    renderWithProviders()
    
    // Collapse the sidebar
    const collapseToggle = screen.getByRole('button', { name: 'Carbon Interface' })
    fireEvent.click(collapseToggle)

    // Check tooltips are present for accessibility in collapsed state
    const menuItems = screen.getAllByRole('menuitem')
    menuItems.forEach(item => {
      expect(item).toHaveAttribute('aria-label')
      expect(item.closest('li')).toHaveAttribute('data-mui-internal-clone-element') // Tooltip present
    })
  })
})