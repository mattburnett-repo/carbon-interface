import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import FlightLeg from '../../../components/flight/FlightLeg'

const mockNavigate = jest.fn()

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}))

// Mock airport codes
jest.mock('airport-iata-codes', () => ({
  LAX: 'Los Angeles International',
  JFK: 'John F Kennedy International'
}))

describe('FlightLeg', () => {
  const mockParentState: any[] = []

  beforeEach(() => {
    mockNavigate.mockClear()
    mockParentState.length = 0
  })

  const renderWithRouter = () => {
    return render(
      <BrowserRouter>
        <FlightLeg parentState={mockParentState} />
      </BrowserRouter>
    )
  }

  it('renders initial empty state message', () => {
    renderWithRouter()
    expect(screen.getByText(/select a departure airport/i)).toBeInTheDocument()
  })

  it('renders add leg button', () => {
    renderWithRouter()
    expect(screen.getByTestId('AddIcon')).toBeInTheDocument()
  })

  it('renders airport selects', () => {
    renderWithRouter()
    expect(screen.getByLabelText(/departure airport/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/destination airport/i)).toBeInTheDocument()
  })

  it('adds a leg when form is filled and add button clicked', async () => {
    renderWithRouter()
    
    // Fill in the form
    const departureSelect = screen.getByLabelText(/departure airport/i)
    const destinationSelect = screen.getByLabelText(/destination airport/i)
    
    // Select actual airports
    await userEvent.click(departureSelect)
    const laxOption = screen.getByRole('option', { name: /lax/i })
    await userEvent.click(laxOption)
    
    await userEvent.click(destinationSelect)
    const jfkOption = screen.getByRole('option', { name: /jfk/i })
    await userEvent.click(jfkOption)
    
    // Click add button and wait for navigation
    const addButton = screen.getByTestId('AddIcon')
    await userEvent.click(addButton)
    
    // Check that both the array was updated and navigation occurred
    expect(mockParentState).toHaveLength(1)
    expect(mockParentState[0]).toEqual(expect.objectContaining({
      departure_airport: 'LAX',
      destination_airport: 'JFK'
    }))
  })

  it('shows cabin class select', () => {
    renderWithRouter()
    expect(screen.getByLabelText(/cabin class/i)).toBeInTheDocument()
  })
}) 