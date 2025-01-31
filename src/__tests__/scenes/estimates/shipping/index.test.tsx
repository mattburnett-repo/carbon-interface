import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Shipping from '../../../../scenes/estimates/shipping'

// Mock ShippingForm
jest.mock('../../../../scenes/estimates/shipping/ShippingForm', () => ({
  __esModule: true,
  default: () => <div data-testid="shipping-form">Shipping Form</div>
}))

// Mock ShippingEstimate
jest.mock('../../../../scenes/estimates/shipping/ShippingEstimate', () => ({
  __esModule: true,
  default: () => <div data-testid="shipping-estimate">Shipping Estimate</div>
}))

describe('Shipping', () => {
  const renderComponent = () => {
    render(
      <BrowserRouter>
        <Shipping />
      </BrowserRouter>
    )
  }

  it('should render shipping form', () => {
    renderComponent()
    expect(screen.getByTestId('shipping-form')).toBeInTheDocument()
  })

  it('should not render shipping estimate by default', () => {
    renderComponent()
    expect(screen.queryByTestId('shipping-estimate')).not.toBeInTheDocument()
  })
}) 