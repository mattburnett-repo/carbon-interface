import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Dashboard from '../../../scenes/dashboard'

const renderWithRouter = () => {
  return render(
    <BrowserRouter>
      <Dashboard />
    </BrowserRouter>
  )
}

describe('Dashboard', () => {
  it('renders the dashboard title', () => {
    renderWithRouter()
    expect(screen.getByText('Carbon Interface API Frontend')).toBeInTheDocument()
  })

  it('renders all estimate cards', () => {
    renderWithRouter()
    expect(screen.getByText('Electricity')).toBeInTheDocument()
    expect(screen.getByText('Flight')).toBeInTheDocument()
    expect(screen.getByText('Shipping')).toBeInTheDocument()
    expect(screen.getByText('Vehicle')).toBeInTheDocument()
    expect(screen.getByText('Fuel Combustion')).toBeInTheDocument()
  })

  it('renders cards with correct links', () => {
    renderWithRouter()
    expect(screen.getByRole('link', { name: /electricity/i }))
      .toHaveAttribute('href', '/estimates/electricity')
    expect(screen.getByRole('link', { name: /flight/i }))
      .toHaveAttribute('href', '/estimates/flight')
    // ... similar checks for other links
  })
}) 