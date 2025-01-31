import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import FlightForm from '../../../../scenes/estimates/flight/FlightForm'
import { act } from 'react-dom/test-utils'

describe('FlightForm', () => {
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
      expect(screen.getByText('At least one flight leg is required.')).toBeInTheDocument()
    })
  })
}) 