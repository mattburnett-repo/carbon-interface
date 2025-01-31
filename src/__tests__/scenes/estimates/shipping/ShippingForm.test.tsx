import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import ShippingForm from '../../../../scenes/estimates/shipping/ShippingForm'
import { act } from 'react-dom/test-utils'

describe('ShippingForm', () => {
  const renderComponent = () => {
    render(
      <BrowserRouter>
        <ShippingForm />
      </BrowserRouter>
    )
  }

  it('should render form fields', () => {
    renderComponent()
    expect(screen.getByRole('form')).toBeInTheDocument()
    expect(screen.getByLabelText('Weight Unit')).toBeInTheDocument()
    expect(screen.getByLabelText('Weight Value')).toBeInTheDocument()
    expect(screen.getByLabelText('Distance Unit')).toBeInTheDocument()
    expect(screen.getByLabelText('Distance Value')).toBeInTheDocument()
    expect(screen.getByLabelText('Transport Method')).toBeInTheDocument()
  })

  it('should validate weight value', async () => {
    renderComponent()
    const weightInput = screen.getByLabelText('Weight Value')
    
    await act(async () => {
      fireEvent.change(weightInput, { target: { value: '0' } })
      fireEvent.blur(weightInput)
    })
    
    await waitFor(() => {
      expect(screen.getByText('Weight value must be greater than 0.')).toBeInTheDocument()
    })
  })

  it('should validate distance value', async () => {
    renderComponent()
    const distanceInput = screen.getByLabelText('Distance Value')
    
    await act(async () => {
      fireEvent.change(distanceInput, { target: { value: '0' } })
      fireEvent.blur(distanceInput)
    })
    
    await waitFor(() => {
      expect(screen.getByText('Distance value must be greater than 0.')).toBeInTheDocument()
    })
  })
}) 