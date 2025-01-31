import React from 'react'
import { render, screen } from '@testing-library/react'
import EstimatesDisplay from '../../../../scenes/estimates/estimate/EstimatesDisplay'
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

// Add to mock section
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

describe('EstimatesDisplay', () => {
  const mockData = [
    {
      data: {
        id: '123',
        type: 'electricity',
        attributes: {
          carbon_g: 1000,
          carbon_lb: 2.20462,
          carbon_kg: 1,
          carbon_mt: 0.001,
          estimated_at: '2023-01-01'
        }
      }
    }
  ]

  it('should render grid with correct data', () => {
    render(<EstimatesDisplay data={mockData} />)

    expect(screen.getByText('Estimates')).toBeInTheDocument()
    expect(screen.getByTestId('data-grid')).toBeInTheDocument()
    
    const rows = JSON.parse(screen.getByTestId('grid-rows').textContent || '') as GridRowsProp
    expect(rows[0]).toEqual({
      id: '123',
      estimated_at: '2023-01-01',
      carbon_g: 1000,
      carbon_lb: 2.20462,
      carbon_kg: 1,
      carbon_mt: 0.001
    })
  })

  it('should render all required columns', () => {
    render(<EstimatesDisplay data={mockData} />)

    const columns = JSON.parse(screen.getByTestId('grid-columns').textContent || '') as GridColDef[]
    const columnFields = columns.map((col: { field: string }) => col.field)
    
    expect(columnFields).toEqual([
      'id',
      'estimated_at',
      'carbon_g',
      'carbon_lb',
      'carbon_kg',
      'carbon_mt'
    ])
  })

  it('should apply correct styling', () => {
    render(<EstimatesDisplay data={mockData} />)
    const box = screen.getByTestId('mui-box-estimate')
    expect(box).toBeInTheDocument()
    expect(box).toHaveStyle({ height: '85vh' })

    const gridBox = screen.getByTestId('mui-box')
    expect(gridBox).toBeInTheDocument()
    expect(gridBox).toHaveStyle({ height: '70vh' })
  })

  it('should render grid toolbar', () => {
    render(<EstimatesDisplay data={mockData} />)
    expect(screen.getByTestId('grid-toolbar')).toBeInTheDocument()
  })

  it('should render columns with correct widths', () => {
    render(<EstimatesDisplay data={mockData} />)
    const columns = JSON.parse(screen.getByTestId('grid-columns').textContent || '') as GridColDef[]
    columns.forEach(col => {
      expect(col.width).toBe(150)
    })
  })

  it('should apply correct title styling', () => {
    render(<EstimatesDisplay data={mockData} />)
    const title = screen.getByTestId('title')
    expect(title).toHaveStyle({
      textAlign: 'center',
      textTransform: 'capitalize'
    })
  })

  it('should enable checkbox selection', () => {
    render(<EstimatesDisplay data={mockData} />)
    const grid = screen.getByTestId('data-grid')
    expect(grid).toHaveAttribute('data-checkbox-selection', 'true')
  })

  it('should handle empty data gracefully', () => {
    render(<EstimatesDisplay data={[]} />)
    const rows = JSON.parse(screen.getByTestId('grid-rows').textContent || '') as GridRowsProp
    expect(rows).toHaveLength(0)
  })

  it('should maintain consistent column order', () => {
    render(<EstimatesDisplay data={mockData} />)
    const columns = JSON.parse(screen.getByTestId('grid-columns').textContent || '') as GridColDef[]
    const headerNames = columns.map(col => col.headerName)
    expect(headerNames).toEqual([
      'ID',
      'Estimated At',
      'Carbon (grams)',
      'Carbon (pounds)',
      'Carbon (kilograms)',
      'Carbon (metic tonnes)'
    ])
  })
}) 