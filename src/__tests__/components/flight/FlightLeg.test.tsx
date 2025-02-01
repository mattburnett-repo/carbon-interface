import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import FlightLeg from '../../../components/flight/FlightLeg'
import { type iLeg } from '../../../scenes/estimates/flight/types'
import { FormikProps } from 'formik'

// Mock the airports data
jest.mock('../../../data/airports.json', () => ({
  airports: [
    { code: 'LHR', name: 'London Heathrow', region: 'Europe' },
    { code: 'CDG', name: 'Paris Charles de Gaulle', region: 'Europe' },
    { code: 'JFK', name: 'John F Kennedy International', region: 'North America' },
    { code: 'LAX', name: 'Los Angeles International', region: 'North America' }
  ]
}))

interface MockAirportSelectProps {
  parentState: FormikProps<iLeg>;
  endpoint: string;
  title: string;
}

// Mock the select components
jest.mock('../../../components/flight/AirportSelect', () => {
  return function MockAirportSelect({ parentState, endpoint, title }: MockAirportSelectProps) {
    return (
      <div>
        <label htmlFor={endpoint}>{title}</label>
        <select
          id={endpoint}
          {...parentState.getFieldProps(endpoint)}
          data-testid={endpoint}
        >
          <option value="Select Airport">Select Airport</option>
          <option value="LHR">LHR - London Heathrow (Europe)</option>
          <option value="CDG">CDG - Paris Charles de Gaulle (Europe)</option>
          <option value="JFK">JFK - John F Kennedy International (North America)</option>
          <option value="LAX">LAX - Los Angeles International (North America)</option>
        </select>
      </div>
    )
  }
})

interface MockCabinClassSelectProps {
  parentState: FormikProps<iLeg>;
}

jest.mock('../../../components/flight/CabinClassSelect', () => {
  return function MockCabinClassSelect({ parentState }: MockCabinClassSelectProps) {
    return (
      <div>
        <label htmlFor="cabin_class">Cabin Class</label>
        <select
          id="cabin_class"
          {...parentState.getFieldProps('cabin_class')}
          data-testid="cabin_class"
        >
          <option value="economy">Economy</option>
          <option value="business">Business</option>
          <option value="first">First</option>
        </select>
      </div>
    )
  }
})

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
    return render(
      <BrowserRouter>
        <FlightLeg legs={mockLegs} onLegsChange={mockOnLegsChange} />
      </BrowserRouter>
    )
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders without crashing', () => {
    renderComponent()
    expect(screen.getByText('Legs')).toBeInTheDocument()
  })

  it('displays existing legs', () => {
    renderComponent()
    expect(screen.getByText('LHR')).toBeInTheDocument()
    expect(screen.getByText('JFK')).toBeInTheDocument()
    expect(screen.getByText('economy')).toBeInTheDocument()
  })

  it('allows removing a leg', () => {
    renderComponent()
    const removeButton = screen.getByRole('button', { name: 'Remove leg' })
    fireEvent.click(removeButton)
    expect(mockOnLegsChange).toHaveBeenCalledWith([])
  })

  it('disables add button when form is invalid', () => {
    renderComponent()
    const addButton = screen.getByRole('button', { name: 'Add leg' })
    expect(addButton).toBeDisabled()
  })

  it('enables add button when form is valid', async () => {
    const user = userEvent.setup()
    renderComponent()
    
    const departureSelect = screen.getByTestId('departure_airport')
    const destinationSelect = screen.getByTestId('destination_airport')
    
    await user.selectOptions(departureSelect, 'LHR')
    await user.selectOptions(destinationSelect, 'JFK')
    
    const addButton = screen.getByRole('button', { name: 'Add leg' })
    expect(addButton).not.toBeDisabled()
  })

  it('adds a new leg when form is valid and add button is clicked', async () => {
    const user = userEvent.setup()
    renderComponent()
    
    const departureSelect = screen.getByTestId('departure_airport')
    const destinationSelect = screen.getByTestId('destination_airport')
    
    await user.selectOptions(departureSelect, 'CDG')
    await user.selectOptions(destinationSelect, 'LAX')
    
    const addButton = screen.getByRole('button', { name: 'Add leg' })
    await user.click(addButton)
    
    expect(mockOnLegsChange).toHaveBeenCalledWith([
      ...mockLegs,
      {
        departure_airport: 'CDG',
        destination_airport: 'LAX',
        cabin_class: 'economy'
      }
    ])
  })
}) 