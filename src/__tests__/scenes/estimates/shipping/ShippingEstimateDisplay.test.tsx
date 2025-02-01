import React from 'react'
import { render, screen } from '@testing-library/react'
import ShippingEstimateDisplay from '../../../../scenes/estimates/shipping/ShippingEstimateDisplay'

const mockValues = {
  weight_unit: 'kg',
  weight_value: 100,
  distance_unit: 'km',
  distance_value: 1000,
  transport_method: 'truck',
  estimated_at: '2023-04-20T12:00:00Z',
  id: '12345',
  carbon_g: 1000,
  carbon_lb: 2.205,
  carbon_kg: 1,
  carbon_mt: 0.001
}

describe('ShippingEstimateDisplay', () => {
  it('should render shipping estimate title', () => {
    render(<ShippingEstimateDisplay values={mockValues} />)
    expect(screen.getByText(/shipping estimate/i)).toBeInTheDocument()
  })

  it('should render shipping details', () => {
    render(<ShippingEstimateDisplay values={mockValues} />)
    expect(screen.getByText(/Weight Unit:.*kg/i)).toBeInTheDocument()
    expect(screen.getByText((content) => 
      content.includes('Weight Value') && content.includes('100')
    )).toBeInTheDocument()
    expect(screen.getByText(/Distance Unit:.*km/i)).toBeInTheDocument()
    expect(screen.getByText((content) => 
      content.includes('Distance Value') && content.includes('1,000')
    )).toBeInTheDocument()
    expect(screen.getByText(/Transport Method:.*truck/i)).toBeInTheDocument()
  })

  it('should render carbon values', () => {
    render(<ShippingEstimateDisplay values={mockValues} />)
    expect(screen.getByText((content) => 
      content.includes('Carbon (grams)') && content.includes('1,000')
    )).toBeInTheDocument()
    expect(screen.getByText((content) => 
      content.includes('Carbon (lbs)') && content.includes('2.205')
    )).toBeInTheDocument()
    expect(screen.getByText((content) => 
      content.includes('Carbon (kg)') && content.includes('1')
    )).toBeInTheDocument()
    expect(screen.getByText((content) => 
      content.includes('Carbon (mt)') && content.includes('0.001')
    )).toBeInTheDocument()
  })
}) 