import React from 'react'
import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import FuelCombustionEstimate from '../../../../scenes/estimates/fuel_combustion/FuelCombustionEstimate'
import { BrowserRouter } from 'react-router-dom'
import { iDisplayProps } from '../../../../scenes/estimates/fuel_combustion/types'

// Mock fetch
global.fetch = jest.fn()

// Add LoadingDisplay mock
jest.mock('../../../../components/LoadingDisplay', () => ({
  __esModule: true,
  default: () => <div data-testid="loading-spinner" />
}))

// Add ErrorDisplay mock
jest.mock('../../../../components/ErrorDisplay', () => ({
  __esModule: true,
  default: () => <div>Error</div>
}))

// Add FuelCombustionEstimateDisplay mock
jest.mock('../../../../scenes/estimates/fuel_combustion/FuelCombustionEstimateDisplay', () => ({
  __esModule: true,
  default: ({ data }: iDisplayProps) => <div>Estimates Display: {JSON.stringify(data)}</div>
}))

// Remove the static react-query mock
jest.mock('react-query', () => ({
  ...jest.requireActual('react-query'),
  useQuery: jest.fn()
}))

describe('FuelCombustionEstimate', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false }
    }
  })

  const mockResponse = {
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

  const renderComponent = () => {
    return render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <FuelCombustionEstimate 
            type="fuel_combustion"
            fuel_source_type="dfo"
            fuel_source_unit="btu"
            fuel_source_value={100}
          />
        </BrowserRouter>
      </QueryClientProvider>
    )
  }

  beforeEach(() => {
    jest.clearAllMocks()
    queryClient.clear()
  })

  it('should show loading state', () => {
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: true,
      error: null,
      data: undefined
    })
    renderComponent()
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
  })

  it('should show error state', () => {
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      error: new Error('API Error'),
      data: undefined
    })
    renderComponent()
    expect(screen.getByText('Error')).toBeInTheDocument()
  })

  it('should show estimate display on successful response', () => {
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
      data: mockResponse
    })
    renderComponent()
    expect(screen.getByText((content: string) => 
      content.includes('Estimates Display') && 
      content.includes(mockResponse.id)
    )).toBeInTheDocument()
  })
}) 