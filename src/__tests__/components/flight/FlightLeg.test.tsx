import React from 'react'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import FlightLeg from '../../../components/flight/FlightLeg'
import { type iLeg } from '../../../scenes/estimates/flight/types'
import { renderWithMui } from '../../../test-utils/mui-test-utils'

// Simple mock for airports
jest.mock('../../../data/airports.json', () => ({
  airports: [
    { code: 'LHR', name: 'London Heathrow', region: 'Europe' },
    { code: 'JFK', name: 'John F Kennedy International', region: 'North America' }
  ]
}))

describe('FlightLeg', () => {
  const mockLegs: iLeg[] = [
    {
      departure_airport: 'LHR',
      destination_airport: 'JFK',
      cabin_class: 'economy'
    }
  ]

  const mockOnLegsChange = jest.fn()

  const renderComponent = () => {
    return renderWithMui(
      <BrowserRouter>
        <FlightLeg legs={mockLegs} onLegsChange={mockOnLegsChange} />
      </BrowserRouter>
    )
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('displays and allows removing existing legs', () => {
    renderComponent()
    expect(screen.getByText('LHR')).toBeInTheDocument()
    expect(screen.getByText('JFK')).toBeInTheDocument()
    
    const removeButton = screen.getByRole('button', { name: /remove leg/i })
    removeButton.click()
    expect(mockOnLegsChange).toHaveBeenCalledWith([])
  })

  it('allows adding a new leg', async () => {
    const user = userEvent.setup({ delay: null })
    renderComponent()
    
    // Fill form
    const departureSelect = screen.getByRole('button', { name: /departure airport/i })
    await user.click(departureSelect)
    const lhrOption = screen.getByRole('option', { name: /LHR/i })
    await user.click(lhrOption)

    const destinationSelect = screen.getByRole('button', { name: /destination airport/i })
    await user.click(destinationSelect)
    const jfkOption = screen.getByRole('option', { name: /JFK/i })
    await user.click(jfkOption)

    const cabinSelect = screen.getByRole('button', { name: /cabin class/i })
    await user.click(cabinSelect)
    const economyOption = screen.getByRole('option', { name: /economy/i })
    await user.click(economyOption)
    
    // Add leg
    const addButton = screen.getByRole('button', { name: /add leg/i })
    await user.click(addButton)
    
    expect(mockOnLegsChange).toHaveBeenCalled()
  })
}) 