import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { MemoryRouter } from 'react-router-dom'
import ShippingEstimate from '../../../../scenes/estimates/shipping/ShippingEstimate'

// Mock fetch
global.fetch = jest.fn()

// Add ErrorDisplay mock
jest.mock('../../../../components/ErrorDisplay', () => ({
  __esModule: true,
  default: ({ error }: { error: Error }) => <div>{error.message}</div>
}))

const mockValues = {
  type: 'shipping',
  weight_unit: 'kg',
  weight_value: 100,
  distance_unit: 'km',
  distance_value: 1000,
  transport_method: 'truck'
}

const mockResponse = {
  data: {
    id: '12345',
    type: 'shipping',
    attributes: {
      weight_unit: 'kg',
      weight_value: 100,
      distance_unit: 'km',
      distance_value: 1000,
      transport_method: 'truck',
      estimated_at: '2023-04-20T12:00:00Z',
      carbon_g: 1000,
      carbon_lb: 2.205,
      carbon_kg: 1,
      carbon_mt: 0.001
    }
  }
}

describe('ShippingEstimate', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false }
    }
  })

  const renderComponent = () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[{ pathname: '/estimates/shipping', state: { values: mockValues } }]}>
          <ShippingEstimate />
        </MemoryRouter>
      </QueryClientProvider>
    )
  }

  beforeEach(() => {
    jest.clearAllMocks()
    queryClient.clear()
  })

  it('should show shipping estimate with all values', async () => {
    global.fetch = jest.fn(() => 
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      })
    ) as jest.Mock

    renderComponent()
    
    await waitFor(() => {
      expect(screen.getByText(/Shipping Estimate/)).toBeInTheDocument()
      expect(screen.getByText(/Weight Value:.*100/)).toBeInTheDocument()
      expect(screen.getByText(/Distance Value:.*1,000/)).toBeInTheDocument()
      expect(screen.getByText(/Carbon \(mt\): 0.001/)).toBeInTheDocument()
    })
  })

  it('should show message when no data available', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[{ pathname: '/estimates/shipping' }]}>
          <ShippingEstimate />
        </MemoryRouter>
      </QueryClientProvider>
    )
    
    expect(screen.getByText(/No shipping data available/)).toBeInTheDocument()
  })

  it('should display all carbon conversion values', async () => {
    global.fetch = jest.fn(() => 
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      })
    ) as jest.Mock

    renderComponent()
    
    await waitFor(() => {
      expect(screen.getByText(/Carbon \(grams\): 1,000/)).toBeInTheDocument()
      expect(screen.getByText(/Carbon \(lbs\): 2.205/)).toBeInTheDocument()
      expect(screen.getByText(/Carbon \(kg\): 1/)).toBeInTheDocument()
      expect(screen.getByText(/Carbon \(mt\): 0.001/)).toBeInTheDocument()
    })
  })

  it('should display shipping details', async () => {
    global.fetch = jest.fn(() => 
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      })
    ) as jest.Mock

    renderComponent()
    
    await waitFor(() => {
      expect(screen.getByText(/Weight Unit: kg/)).toBeInTheDocument()
      expect(screen.getByText(/Weight Value:.*100/)).toBeInTheDocument()
      expect(screen.getByText(/Distance Unit: km/)).toBeInTheDocument()
      expect(screen.getByText(/Distance Value:.*1,000/)).toBeInTheDocument()
      expect(screen.getByText(/Transport Method: truck/)).toBeInTheDocument()
      expect(screen.getByText(/Estimated at:.*20-04-2023/)).toBeInTheDocument()
    })
  })

  it('should handle malformed API response', async () => {
    const malformedResponse = {
      data: {
        id: '12345',
        type: 'shipping',
        // Missing attributes object
      }
    }

    global.fetch = jest.fn(() => 
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(malformedResponse)
      })
    ) as jest.Mock

    renderComponent()
    
    await waitFor(() => {
      expect(screen.getByText(/API Error/)).toBeInTheDocument()
    })
  })

  it('should use form default values', async () => {
    const defaultValues = {
      type: 'shipping',
      weight_unit: 'kg',
      weight_value: 100,
      distance_unit: 'km',
      distance_value: 100,
      transport_method: 'truck'
    }

    global.fetch = jest.fn(() => 
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          data: {
            id: '12345',
            type: 'shipping',
            attributes: {
              ...defaultValues,
              estimated_at: '2023-04-20T12:00:00Z',
              carbon_g: 1000,
              carbon_lb: 2.205,
              carbon_kg: 1,
              carbon_mt: 0.001
            }
          }
        })
      })
    ) as jest.Mock

    render(
      <QueryClientProvider client={new QueryClient({
        defaultOptions: {
          queries: {
            retry: false
          }
        }
      })}>
        <MemoryRouter initialEntries={[{ pathname: '/estimates/shipping', state: { values: defaultValues } }]}>
          <ShippingEstimate />
        </MemoryRouter>
      </QueryClientProvider>
    )
    
    await waitFor(() => {
      expect(screen.getByText(/Weight Value:.*100/)).toBeInTheDocument()
      expect(screen.getByText(/Distance Value:.*100/)).toBeInTheDocument()
    })
  })
}) 