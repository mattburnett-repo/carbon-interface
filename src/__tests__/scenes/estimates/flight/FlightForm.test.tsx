import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import FlightForm from '../../../../scenes/estimates/flight/FlightForm'

describe('FlightForm', () => {
  const mockSubmit = jest.fn()

  beforeEach(() => {
    mockSubmit.mockClear()
  })

  it('renders initial step with basic fields', () => {
    render(<FlightForm onSubmit={mockSubmit} />)

    expect(screen.getByRole('heading', { name: /flight details/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/passengers/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument()
  })

  it('completes full form journey', async () => {
    render(<FlightForm onSubmit={mockSubmit} />)

    // Step 1: Flight Details
    const passengersInput = screen.getByLabelText(/passengers/i)
    await act(async () => {
      fireEvent.change(passengersInput, { target: { value: '2' } })
    })

    const nextButton = screen.getByRole('button', { name: /next/i })
    await act(async () => {
      fireEvent.click(nextButton)
    })

    // Step 2: Departure Airport
    expect(screen.getByRole('heading', { name: /departure airport/i })).toBeInTheDocument()
    const departureSelect = screen.getByLabelText(/departure airport/i)
    await act(async () => {
      fireEvent.mouseDown(departureSelect)
    })
    const departureOptions = screen.getAllByRole('option')
    await act(async () => {
      fireEvent.click(departureOptions[0])
    })

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /next/i }))
    })

    // Step 3: Destination Airport
    expect(screen.getByRole('heading', { name: /destination airport/i })).toBeInTheDocument()
    const destinationSelect = screen.getByLabelText(/destination airport/i)
    await act(async () => {
      fireEvent.mouseDown(destinationSelect)
    })
    const destinationOptions = screen.getAllByRole('option')
    await act(async () => {
      fireEvent.click(destinationOptions[1])
    })

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /next/i }))
    })

    // Step 4: Cabin Class
    expect(screen.getByRole('heading', { name: /cabin class/i })).toBeInTheDocument()
    const cabinSelect = screen.getByLabelText(/cabin class/i)
    await act(async () => {
      fireEvent.mouseDown(cabinSelect)
    })
    const cabinOptions = screen.getAllByRole('option')
    await act(async () => {
      fireEvent.click(cabinOptions[0])
    })

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /next/i }))
    })

    // Step 5: Review & Submit
    expect(screen.getByRole('heading', { name: /review/i })).toBeInTheDocument()
    expect(screen.getByText(/2/)).toBeInTheDocument() // Passengers count
    
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /get estimate/i }))
    })

    expect(mockSubmit).toHaveBeenCalled()
  })

  it('validates passenger count', async () => {
    render(<FlightForm onSubmit={mockSubmit} />)

    const passengersInput = screen.getByLabelText(/passengers/i)
    await act(async () => {
      fireEvent.change(passengersInput, { target: { value: '0' } })
    })

    const nextButton = screen.getByRole('button', { name: /next/i })
    await act(async () => {
      fireEvent.click(nextButton)
    })

    expect(screen.getByText(/passenger.*must be greater than 0/i)).toBeInTheDocument()
  })

  it('allows navigation between steps', async () => {
    render(<FlightForm onSubmit={mockSubmit} />)

    // Go forward
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/passengers/i), { target: { value: '2' } })
      fireEvent.click(screen.getByRole('button', { name: /next/i }))
    })

    expect(screen.getByRole('heading', { name: /departure airport/i })).toBeInTheDocument()

    // Go back
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /back/i }))
    })

    expect(screen.getByRole('heading', { name: /flight details/i })).toBeInTheDocument()
  })
})