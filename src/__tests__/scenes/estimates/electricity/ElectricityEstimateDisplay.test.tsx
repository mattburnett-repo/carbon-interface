import React from 'react'
import { render, screen } from '@testing-library/react'
import ElectricityEstimateDisplay from '../../../../scenes/estimates/electricity/ElectricityEstimateDisplay'
import { type iDisplayProps } from '../../../../scenes/estimates/electricity/types'

describe('ElectricityEstimateDisplay', () => {
  const mockData: iDisplayProps = {
    data: {
      id: '123',
      type: 'estimate',
      attributes: {
        carbon_g: 1000,
        carbon_lb: 2.20462,
        carbon_kg: 1,
        carbon_mt: 0.001,
        estimated_at: '2023-01-01',
        electricity_unit: 'mwh' as const,
        electricity_value: 100,
        country: 'us',
        state: 'ca'
      }
    }
  }

  test('should display carbon values', () => {
    render(<ElectricityEstimateDisplay {...mockData} />)

    // Check for carbon values with their labels
    const carbonLabels = [
      { label: 'Carbon (grams)', value: '1,000' },
      { label: 'Carbon (lbs)', value: '2.205' },
      { label: 'Carbon (kg)', value: '1' },
      { label: 'Carbon (mt)', value: '0.001' }
    ]

    carbonLabels.forEach(({ label, value }) => {
      const element = screen.getByText((content) => 
        content.includes(label) || (content.trim() === value)
      )
      expect(element).toBeInTheDocument()
    })
  })

  test('should display input data correctly', () => {
    render(<ElectricityEstimateDisplay {...mockData} />)

    // Check title
    expect(screen.getByText('Electricity Estimate')).toBeInTheDocument()

    // Check input values
    expect(screen.getByText((content) => content.includes('Unit:') && content.includes('mwh'))).toBeInTheDocument()
    expect(screen.getByText((content) => content.includes('Value:') && content.includes('100'))).toBeInTheDocument()
    expect(screen.getByText((content) => content.includes('Country:') && content.includes('US'))).toBeInTheDocument()
    expect(screen.getByText((content) => content.includes('State/Region:') && content.includes('CA'))).toBeInTheDocument()
  })

  test('should format estimated date correctly', () => {
    render(<ElectricityEstimateDisplay {...mockData} />)
    
    expect(screen.getByText((content) => 
      content.includes('Estimated at:') && content.includes('01-01-2023')
    )).toBeInTheDocument()
  })

  test('should handle kwh unit correctly', () => {
    const kwhData = {
      data: {
        ...mockData.data,
        attributes: {
          ...mockData.data.attributes,
          electricity_unit: 'kwh' as const
        }
      }
    }
    
    render(<ElectricityEstimateDisplay {...kwhData} />)
    expect(screen.getByText((content) => content.includes('kwh'))).toBeInTheDocument()
  })
}) 