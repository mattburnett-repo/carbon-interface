import React from 'react'
import { render, screen } from '@testing-library/react'
import ShippingEstimateDisplay from '../../../../scenes/estimates/shipping/ShippingEstimateDisplay'
import { type iDisplayProps } from '../../../../scenes/estimates/shipping/types'

describe('ShippingEstimateDisplay', () => {
  const mockData: iDisplayProps = {
    data: {
      id: '123',
      type: 'shipping',
      attributes: {
        weight_unit: 'kg',
        weight_value: 100,
        distance_unit: 'km',
        distance_value: 1000,
        transport_method: 'truck',
        estimated_at: '2023-01-01',
        carbon_g: 1000,
        carbon_lb: 2.20462,
        carbon_kg: 1,
        carbon_mt: 0.001
      }
    }
  }

  it('should render shipping estimate title', () => {
    render(<ShippingEstimateDisplay {...mockData} />)
    expect(screen.getByText('Shipping Estimate')).toBeInTheDocument()
  })

  it('should render shipping details', () => {
    render(<ShippingEstimateDisplay {...mockData} />)
    const weightUnit = screen.getByText(/Weight Unit:/i)
    const weightValue = screen.getByText(/Weight Value:/i)
    const distanceUnit = screen.getByText(/Distance Unit:/i)
    const distanceValue = screen.getByText(/Distance Value:/i)
    const transportMethod = screen.getByText(/Transport Method:/i)

    expect(weightUnit).toBeInTheDocument()
    expect(weightUnit.textContent).toContain('kg')
    expect(weightValue).toBeInTheDocument()
    expect(weightValue.textContent).toContain('100')
    expect(distanceUnit).toBeInTheDocument()
    expect(distanceUnit.textContent).toContain('km')
    expect(distanceValue).toBeInTheDocument()
    expect(distanceValue.textContent).toContain('1,000')
    expect(transportMethod).toBeInTheDocument()
    expect(transportMethod.textContent).toContain('truck')
  })

  it('should render carbon values', () => {
    render(<ShippingEstimateDisplay {...mockData} />)
    expect(screen.getByText(/Carbon \(grams\): 1,000/)).toBeInTheDocument()
    expect(screen.getByText(/Carbon \(lbs\): 2.205/)).toBeInTheDocument()
    expect(screen.getByText(/Carbon \(kg\): 1/)).toBeInTheDocument()
    expect(screen.getByText(/Carbon \(mt\): 0.001/)).toBeInTheDocument()
  })
}) 