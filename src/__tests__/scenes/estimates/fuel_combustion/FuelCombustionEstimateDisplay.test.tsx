import React from 'react'
import { render, screen } from '@testing-library/react'
import FuelCombustionEstimateDisplay from '../../../../scenes/estimates/fuel_combustion/FuelCombustionEstimateDisplay'
import { iDisplayProps } from '../../../../scenes/estimates/fuel_combustion/types'

// Mock Material-UI components
jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  Typography: ({ children }: { children: React.ReactNode }) => (
    <h1 data-testid="title" style={{
      textAlign: 'center',
      marginBottom: '2rem',
      textTransform: 'capitalize'
    }}>{children}</h1>
  ),
  Box: ({ children, className, style }: { 
    children: React.ReactNode, 
    className?: string, 
    style?: React.CSSProperties
  }) => (
    <div 
      className={`${className || ''} MuiBox-root`} 
      data-testid={className ? `mui-box-${className}` : 'mui-box'}
      style={{ ...style, height: className === 'estimate' ? '85vh' : '70vh' }}
    >
      {children}
    </div>
  )
}))

// Mock at the path the component uses
jest.mock('../../../../../src/components/fuel_combustion/FuelSources', () => ({
  __esModule: true,
  useFuelSourceName: () => 'Diesel Fuel Oil',
  FuelSourceTypes: {
    dfo: 'Diesel Fuel Oil',
    rfo: 'Residual Fuel Oil'
  },
  FuelSourceUnits: {
    btu: 'BTU',
    gal: 'Gallons'
  }
}))

describe('FuelCombustionEstimateDisplay', () => {
  const mockData: iDisplayProps['data'] = {
    id: '123',
    type: 'fuel_combustion',
    attributes: {
      fuel_source_type: 'dfo',
      fuel_source_unit: 'btu',
      fuel_source_value: 100,
      carbon_g: 1000,
      carbon_lb: 2.20462,
      carbon_kg: 1,
      carbon_mt: 0.001,
      estimated_at: '2023-01-01'
    }
  }

  it('should render fuel combustion estimate title', () => {
    render(<FuelCombustionEstimateDisplay data={mockData} />)
    expect(screen.getByText('Fuel Combustion Estimate')).toBeInTheDocument()
  })

  it('should render fuel details', () => {
    render(<FuelCombustionEstimateDisplay data={mockData} />)
    
    // Check basic info
    expect(screen.getByText(/Fuel Source Type:/)).toBeInTheDocument()
    expect(screen.getByText(/Fuel Source Unit:/)).toBeInTheDocument()
    expect(screen.getByText(/Fuel Source Value:/)).toBeInTheDocument()
    expect(screen.getByText(/Estimated at:/)).toBeInTheDocument()
    expect(screen.getByText(/ID:/)).toBeInTheDocument()
  })

  it('should render carbon values', () => {
    render(<FuelCombustionEstimateDisplay data={mockData} />)
    
    expect(screen.getByText(/Carbon \(grams\): 1,000/)).toBeInTheDocument()
    expect(screen.getByText(/Carbon \(lbs\): 2.205/)).toBeInTheDocument()
    expect(screen.getByText(/Carbon \(kg\): 1/)).toBeInTheDocument()
    expect(screen.getByText(/Carbon \(mt\): 0.001/)).toBeInTheDocument()
  })

  it('should apply correct styling', () => {
    render(<FuelCombustionEstimateDisplay data={mockData} />)
    const box = screen.getByTestId('mui-box-estimate')
    expect(box).toBeInTheDocument()
    expect(box).toHaveStyle({ height: '85vh' })
  })

  it('should format numbers correctly', () => {
    const dataWithLargeNumbers = {
      ...mockData,
      attributes: {
        ...mockData.attributes,
        carbon_g: 1000000,
        carbon_lb: 2204.62,
        carbon_kg: 1000,
        carbon_mt: 1
      }
    }
    render(<FuelCombustionEstimateDisplay data={dataWithLargeNumbers} />)
    
    expect(screen.getByText(/Carbon \(grams\): 1,000,000/)).toBeInTheDocument()
    expect(screen.getByText(/Carbon \(lbs\): 2,204.62/)).toBeInTheDocument()
    expect(screen.getByText(/Carbon \(kg\): 1,000/)).toBeInTheDocument()
    expect(screen.getByText(/Carbon \(mt\): 1/)).toBeInTheDocument()
  })
}) 