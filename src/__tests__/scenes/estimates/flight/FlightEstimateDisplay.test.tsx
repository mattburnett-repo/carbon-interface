import React from 'react'
import { render, screen } from '@testing-library/react'
import FlightEstimateDisplay from '../../../../scenes/estimates/flight/FlightEstimateDisplay'
import { GridRowsProp, GridColDef, GridToolbarProps } from '@mui/x-data-grid'

// Mock DataGrid
jest.mock('@mui/x-data-grid', () => ({
  ...jest.requireActual('@mui/x-data-grid'),
  DataGrid: ({ rows, columns, components, checkboxSelection }: { 
    rows: GridRowsProp, 
    columns: GridColDef[], 
    components: { Toolbar?: React.ComponentType<GridToolbarProps> },
    checkboxSelection: boolean 
  }) => (
    <div data-testid="data-grid" data-checkbox-selection={checkboxSelection}>
      <div data-testid="grid-rows">{JSON.stringify(rows)}</div>
      <div data-testid="grid-columns">{JSON.stringify(columns)}</div>
      {components?.Toolbar && <components.Toolbar />}
    </div>
  ),
  GridToolbar: () => <div data-testid="grid-toolbar">Toolbar</div>
}))

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

describe('FlightEstimateDisplay', () => {
  const mockData = {
    id: '123',
    type: 'flight',
    attributes: {
      passengers: 2,
      legs: [{
        departure_airport: 'SFO',
        destination_airport: 'JFK',
        cabin_class: 'economy'
      }],
      distance_value: 2586,
      distance_unit: 'mi',
      carbon_g: 1000,
      carbon_lb: 2.20462,
      carbon_kg: 1,
      carbon_mt: 0.001,
      estimated_at: '2023-01-01'
    }
  }

  it('should render flight estimate title', () => {
    render(<FlightEstimateDisplay data={mockData} />)
    expect(screen.getByText('Flight Estimate')).toBeInTheDocument()
  })

  it('should render flight details', () => {
    render(<FlightEstimateDisplay data={mockData} />)
    
    // Check basic info
    expect(screen.getByText(/Distance Unit: mi/)).toBeInTheDocument()
    expect(screen.getByText(/Passengers: 2/)).toBeInTheDocument()
    expect(screen.getByText(/Estimated at:01-01-2023/)).toBeInTheDocument()
    expect(screen.getByText(/ID: 123/)).toBeInTheDocument()
    
    // Check legs
    expect(screen.getByText('Legs:')).toBeInTheDocument()
    expect(screen.getByText(/SFO to JFK/)).toBeInTheDocument()
  })

  it('should render carbon values', () => {
    render(<FlightEstimateDisplay data={mockData} />)
    
    expect(screen.getByText(/Carbon \(grams\): 1,000/)).toBeInTheDocument()
    expect(screen.getByText(/Carbon \(lbs\): 2.205/)).toBeInTheDocument()
    expect(screen.getByText(/Carbon \(kg\): 1/)).toBeInTheDocument()
    expect(screen.getByText(/Carbon \(mt\): 0.001/)).toBeInTheDocument()
  })

  it('should apply correct styling', () => {
    render(<FlightEstimateDisplay data={mockData} />)
    const box = screen.getByTestId('mui-box-estimate')
    expect(box).toBeInTheDocument()
    expect(box).toHaveStyle({ height: '85vh' })
  })

  it('should handle empty legs gracefully', () => {
    const emptyData = {
      id: '123',
      type: 'flight',
      attributes: {
        passengers: 0,
        legs: [],
        distance_value: 0,
        distance_unit: 'km',
        carbon_g: 0,
        carbon_lb: 0,
        carbon_kg: 0,
        carbon_mt: 0,
        estimated_at: '2023-01-01'
      }
    }
    render(<FlightEstimateDisplay data={emptyData} />)
    expect(screen.getByText('Legs:')).toBeInTheDocument()
    expect(screen.queryByText(/to/)).not.toBeInTheDocument()
  })
}) 