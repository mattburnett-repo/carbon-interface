import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import FlightForm from '../../../../scenes/estimates/flight/FlightForm'
import { act } from 'react-dom/test-utils'
import { FormikProps } from 'formik'
import { type iFlightFormFields, type iLeg } from '../../../../scenes/estimates/flight/types'

// Mock the airports data
jest.mock('../../../../data/airports.json', () => ({
  airports: [
    { code: 'LHR', name: 'London Heathrow', region: 'Europe' },
    { code: 'CDG', name: 'Paris Charles de Gaulle', region: 'Europe' },
    { code: 'JFK', name: 'John F Kennedy International', region: 'North America' },
    { code: 'LAX', name: 'Los Angeles International', region: 'North America' }
  ]
}))

interface MockAirportSelectProps {
  parentState: FormikProps<iFlightFormFields>;
  endpoint: string;
  title: string;
}

// Mock the select components
jest.mock('../../../../components/flight/AirportSelect', () => {
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

// Mock react-router-dom
const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}))

interface NavigationState {
  state: {
    values: iFlightFormFields;
  }
}

interface MockCabinClassSelectProps {
  parentState: FormikProps<iFlightFormFields>;
}

// First, add a mock for CabinClassSelect component at the top with other mocks
jest.mock('../../../../components/flight/CabinClassSelect', () => {
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

describe('FlightForm', () => {
  beforeEach(() => {
    mockNavigate.mockClear()
  })

  const renderComponent = () => {
    render(
      <BrowserRouter>
        <FlightForm />
      </BrowserRouter>
    )
  }

  it('should render form fields', () => {
    renderComponent()
    expect(screen.getByRole('form')).toBeInTheDocument()
    expect(screen.getByLabelText('Passengers')).toBeInTheDocument()
    expect(screen.getByLabelText(/distance unit/i)).toBeInTheDocument()
  })

  it('should validate passenger count', async () => {
    renderComponent()
    const passengerInput = screen.getByLabelText('Passengers')
    
    await act(async () => {
      fireEvent.change(passengerInput, { target: { value: '0' } })
      fireEvent.blur(passengerInput)
    })
    
    await waitFor(() => {
      expect(screen.getByText('Passenger Count must be greater than 0.')).toBeInTheDocument()
    })

    await act(async () => {
      fireEvent.change(passengerInput, { target: { value: '301' } })
      fireEvent.blur(passengerInput)
    })
    
    await waitFor(() => {
      expect(screen.getByText('Passenger Count must be 300 or less.')).toBeInTheDocument()
    })
  })

  it('should validate flight legs', async () => {
    renderComponent()
    const submitButton = screen.getByRole('button', { name: /get estimate/i })
    
    await act(async () => {
      fireEvent.click(submitButton)
    })
    
    await waitFor(() => {
      expect(screen.getByText(
        'Select departure airport, destination airport, and cabin class, then click the + button'
      )).toBeInTheDocument()
    })
  })

  it('shows message to add flight leg when no legs exist', async () => {
    const user = userEvent.setup()
    render(
      <BrowserRouter>
        <FlightForm />
      </BrowserRouter>
    )

    // Click submit to trigger validation
    const submitButton = screen.getByRole('button', { name: /get estimate/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(
        'Select departure airport, destination airport, and cabin class, then click the + button'
      )).toBeInTheDocument()
    })
  })

  describe('Error messages', () => {
    it('shows initial message when no airports are selected', async () => {
      render(
        <BrowserRouter>
          <FlightForm />
        </BrowserRouter>
      )
      const submitButton = screen.getByRole('button', { name: /get estimate/i })
      await userEvent.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getByText(
          'Select departure airport, destination airport, and cabin class, then click the + button'
        )).toBeInTheDocument()
      })
    })

    it('shows click + button message when airports are selected but not added', async () => {
      const user = userEvent.setup()
      render(
        <BrowserRouter>
          <FlightForm />
        </BrowserRouter>
      )
      
      // Select airports and trigger form updates
      const departureSelect = screen.getByTestId('departure_airport')
      const destinationSelect = screen.getByTestId('destination_airport')
      
      // Fill out the form completely
      await user.selectOptions(departureSelect, 'LHR')
      await user.selectOptions(destinationSelect, 'JFK')
      await user.tab() // Move to next field
      
      // Wait for form state to update
      await waitFor(() => {
        expect(departureSelect).toHaveValue('LHR')
        expect(destinationSelect).toHaveValue('JFK')
      })
      
      // Submit to trigger validation
      const submitButton = screen.getByRole('button', { name: /get estimate/i })
      await user.click(submitButton)
      
      await waitFor(() => {
        const alert = screen.getByRole('alert')
        expect(alert).toHaveTextContent(/click the \+ button/i)
      })
    })

    it('allows submission when leg is properly added', async () => {
      const user = userEvent.setup()
      const { container } = render(
        <BrowserRouter>
          <FlightForm />
        </BrowserRouter>
      )
      
      // Select and add a leg
      const departureSelect = screen.getByTestId('departure_airport')
      const destinationSelect = screen.getByTestId('destination_airport')
      
      await user.selectOptions(departureSelect, 'LHR')
      await user.selectOptions(destinationSelect, 'JFK')
      
      const addButton = screen.getByRole('button', { name: /add leg/i })
      await user.click(addButton)
      
      // Try to submit
      const submitButton = screen.getByRole('button', { name: /get estimate/i })
      await user.click(submitButton)
      
      // Should not show any error messages
      expect(screen.queryByText('Click the + button to add a flight leg')).not.toBeInTheDocument()
      expect(screen.queryByText(
        'Select departure airport, destination airport, and cabin class, then click the + button'
      )).not.toBeInTheDocument()
    })
  })

  describe('Leg management', () => {
    it('allows adding multiple legs', async () => {
      const user = userEvent.setup()
      render(
        <BrowserRouter>
          <FlightForm />
        </BrowserRouter>
      )
      
      const departureSelect = screen.getByTestId('departure_airport')
      const destinationSelect = screen.getByTestId('destination_airport')
      
      await user.selectOptions(departureSelect, 'LHR')
      await user.selectOptions(destinationSelect, 'JFK')
      await user.click(screen.getByRole('button', { name: /add leg/i }))
      
      await user.selectOptions(departureSelect, 'CDG')
      await user.selectOptions(destinationSelect, 'LAX')
      await user.click(screen.getByRole('button', { name: /add leg/i }))
      
      await waitFor(() => {
        expect(screen.getAllByText('LHR')).toHaveLength(1)
        expect(screen.getAllByText('JFK')).toHaveLength(1)
        expect(screen.getAllByText('CDG')).toHaveLength(1)
        expect(screen.getAllByText('LAX')).toHaveLength(1)
      })
    })

    it('allows removing legs', async () => {
      const user = userEvent.setup()
      render(
        <BrowserRouter>
          <FlightForm />
        </BrowserRouter>
      )
      
      // Add a leg first
      const departureSelect = screen.getByTestId('departure_airport')
      const destinationSelect = screen.getByTestId('destination_airport')
      
      await user.selectOptions(departureSelect, 'LHR')
      await user.selectOptions(destinationSelect, 'JFK')
      await user.click(screen.getByRole('button', { name: /add leg/i }))
      
      // Remove the leg
      await user.click(screen.getByRole('button', { name: /remove leg/i }))
      
      // Verify leg is removed
      expect(screen.queryByText('LHR')).not.toBeInTheDocument()
      expect(screen.queryByText('JFK')).not.toBeInTheDocument()
    })

    it('allows selecting different cabin classes', async () => {
      const user = userEvent.setup()
      render(
        <BrowserRouter>
          <FlightForm />
        </BrowserRouter>
      )
      
      const departureSelect = screen.getByTestId('departure_airport')
      const destinationSelect = screen.getByTestId('destination_airport')
      const cabinSelect = screen.getByTestId('cabin_class')
      
      await user.selectOptions(departureSelect, 'LHR')
      await user.selectOptions(destinationSelect, 'JFK')
      await user.selectOptions(cabinSelect, 'business')
      await user.click(screen.getByRole('button', { name: /add leg/i }))
      
      // Look for the specific added leg's cabin class
      const addedLegs = screen.getAllByText(/business/i)
      expect(addedLegs.length).toBeGreaterThan(0)
    })

    it('resets form fields after adding a leg', async () => {
      const user = userEvent.setup()
      render(
        <BrowserRouter>
          <FlightForm />
        </BrowserRouter>
      )
      
      const departureSelect = screen.getByTestId('departure_airport')
      const destinationSelect = screen.getByTestId('destination_airport')
      
      await user.selectOptions(departureSelect, 'LHR')
      await user.selectOptions(destinationSelect, 'JFK')
      await user.click(screen.getByRole('button', { name: /add leg/i }))
      
      expect(departureSelect).toHaveValue('Select Airport')
      expect(destinationSelect).toHaveValue('Select Airport')
    })
  })

  describe('Form validation', () => {
    it('validates passenger count', async () => {
      const user = userEvent.setup()
      render(
        <BrowserRouter>
          <FlightForm />
        </BrowserRouter>
      )
      
      const passengerInput = screen.getByLabelText('Passengers')
      
      await user.clear(passengerInput)
      await user.type(passengerInput, '-1')
      await user.tab()
      
      await waitFor(() => {
        expect(screen.getByText('Passenger Count must be greater than 0.')).toBeInTheDocument()
      })
    })

    it('validates distance unit', async () => {
      const user = userEvent.setup()
      render(
        <BrowserRouter>
          <FlightForm />
        </BrowserRouter>
      )
      
      const distanceUnitSelect = screen.getByRole('button', { name: /distance unit/i })
      await user.click(distanceUnitSelect)
      
      const milesOption = screen.getByRole('option', { name: /miles/i })
      await user.click(milesOption)
      
      expect(screen.getByRole('button', { name: /miles/i })).toBeInTheDocument()
    })

    it('navigates to estimate page on successful submission', async () => {
      const user = userEvent.setup()
      render(
        <BrowserRouter>
          <FlightForm />
        </BrowserRouter>
      )
      
      // Add a leg
      const departureSelect = screen.getByTestId('departure_airport')
      const destinationSelect = screen.getByTestId('destination_airport')
      
      await user.selectOptions(departureSelect, 'LHR')
      await user.selectOptions(destinationSelect, 'JFK')
      await user.click(screen.getByRole('button', { name: /add leg/i }))
      
      // Submit form
      await user.click(screen.getByRole('button', { name: /get estimate/i }))
      
      // Verify navigation
expect(mockNavigate).toHaveBeenCalledWith('/estimates/flight', {
  state: {
    values: expect.objectContaining<iFlightFormFields>({
      type: 'flight',
      passengers: 1,
      distance_unit: 'km',
      cabin_class: 'economy',
      legs: expect.arrayContaining<iLeg>([
        expect.objectContaining<iLeg>({
          departure_airport: 'LHR',
          destination_airport: 'JFK',
          cabin_class: 'economy'
        })
      ])
    })
  }
} as NavigationState)
    })

    it('prevents selecting same airport for departure and destination', async () => {
      const user = userEvent.setup()
      render(
        <BrowserRouter>
          <FlightForm />
        </BrowserRouter>
      )
      
      const departureSelect = screen.getByTestId('departure_airport')
      const destinationSelect = screen.getByTestId('destination_airport')
      
      await user.selectOptions(departureSelect, 'LHR')
      await user.selectOptions(destinationSelect, 'LHR')
      await user.tab() // Trigger validation
      
      await waitFor(() => {
        const errorMessage = screen.getByText(
          /departure and destination airports must be different/i,
          { selector: '.MuiTypography-caption' }
        )
        expect(errorMessage).toBeInTheDocument()
      })
    })
  })
}) 