import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import FlightEstimate from '../../../../scenes/estimates/flight/FlightEstimate'
import { BrowserRouter } from 'react-router-dom'
import { iDisplayProps } from '../../../../scenes/estimates/flight/types'

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
  default: ({ error }: { error: Error }) => <div>{error.message}</div>
}))

// Add FlightEstimateDisplay mock
jest.mock('../../../../scenes/estimates/flight/FlightEstimateDisplay', () => ({
  __esModule: true,
  default: ({ data }: iDisplayProps) => <div>Estimates Display: {JSON.stringify(data)}</div>
}))

// Mock router
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    state: {
      values: {
        type: 'flight',
        passengers: 2,
        legs: [{
          departure_airport: 'SFO',
          destination_airport: 'JFK',
          cabin_class: 'economy'
        }],
        distance_unit: 'km',
        cabin_class: 'economy'
      }
    }
  }),
  BrowserRouter: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}))

describe('FlightEstimate', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      }
    }
  })

  const renderComponent = () => {
    return render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <FlightEstimate 
            type="flight"
            passengers={2}
            legs={[{
              departure_airport: 'SFO',
              destination_airport: 'JFK',
              cabin_class: 'economy'
            }]}
            distance_unit="km"
            cabin_class="economy"
          />
        </BrowserRouter>
      </QueryClientProvider>
    )
  }

  beforeEach(() => {
    jest.clearAllMocks()
    queryClient.clear()
  })

  // Silence console.error for expected errors
  const originalError = console.error
  beforeAll(() => {
    console.error = jest.fn()
  })

  afterAll(() => {
    console.error = originalError
  })

  it('should show loading state', () => {
    ;(global.fetch as jest.Mock).mockImplementationOnce(() => new Promise(() => {}))
    renderComponent()
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
  })

  it('should show estimate display on successful response', async () => {
    const mockResponse = {
      data: {
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
    }

    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    })

    renderComponent()
    expect(await screen.findByText((content) => 
      content.includes('Estimates Display') && 
      content.includes(mockResponse.data.id)
    )).toBeInTheDocument()
  })
}) 