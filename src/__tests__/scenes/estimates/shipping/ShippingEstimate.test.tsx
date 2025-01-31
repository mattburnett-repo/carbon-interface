import React from 'react'
import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import ShippingEstimate from '../../../../scenes/estimates/shipping/ShippingEstimate'
import { BrowserRouter } from 'react-router-dom'
import { type iDisplayProps } from '../../../../scenes/estimates/shipping/types'

jest.mock('../../../../components/LoadingDisplay', () => ({
  __esModule: true,
  default: () => <div data-testid="loading-spinner" />
}))

jest.mock('../../../../components/ErrorDisplay', () => ({
  __esModule: true,
  default: ({ error }: { error: Error }) => <div>Error: {error.message}</div>
}))

jest.mock('../../../../scenes/estimates/shipping/ShippingEstimateDisplay', () => ({
  __esModule: true,
  default: ({ data }: iDisplayProps) => (
    <div>
      <div>Shipping Display</div>
      <div>ID: {data.id}</div>
    </div>
  )
}))

jest.mock('react-query', () => ({
  ...jest.requireActual('react-query'),
  useQuery: jest.fn()
}))

describe('ShippingEstimate', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false }
    }
  })

  const mockResponse = {
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

  const renderComponent = () => {
    return render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ShippingEstimate 
            type="shipping"
            weight_unit="kg"
            weight_value={100}
            distance_unit="km"
            distance_value={1000}
            transport_method="truck"
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
      data: undefined,
      error: new Error('API Error')
    })
    renderComponent()
    expect(screen.getByText('Error: API Error')).toBeInTheDocument()
  })

  it('should show estimate display on successful response', () => {
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
      data: mockResponse
    })
    renderComponent()
    expect(screen.getByText('Shipping Display')).toBeInTheDocument()
    expect(screen.getByText(`ID: ${mockResponse.id}`)).toBeInTheDocument()
  })
}) 