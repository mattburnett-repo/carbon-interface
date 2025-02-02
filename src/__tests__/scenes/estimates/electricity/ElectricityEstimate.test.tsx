import React from 'react'
import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import ElectricityEstimate from '../../../../scenes/estimates/electricity/ElectricityEstimate'
import { BrowserRouter } from 'react-router-dom'

// Add ErrorDisplay mock FIRST
jest.mock('../../../../components/ErrorDisplay', () => ({
  __esModule: true,
  default: ({ error }: { error: Error }) => <div>{error.message}</div>
}))

// Mock fetch
global.fetch = jest.fn()

describe('ElectricityEstimate', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      }
    }
  })

  const renderComponent = () => {
    const estimateValues = {
      type: 'electricity' as const,
      electricity_value: 100,
      electricity_unit: 'kwh' as const,
      country: 'us',
      state: 'ca'
    }

    return render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ElectricityEstimate estimateValues={estimateValues} />
        </BrowserRouter>
      </QueryClientProvider>
    )
  }

  beforeEach(() => {
    jest.clearAllMocks()
    queryClient.clear()
  })

  it('should show estimate display on successful response', async () => {
    const mockResponse = {
      data: {
        id: '123',
        type: 'electricity',
        attributes: {
          carbon_mt: 100,
          country: 'us',
          state: 'ca',
          electricity_value: 1000,
          electricity_unit: 'kwh',
          estimated_at: '2023-01-01T00:00:00.000Z'
        }
      }
    }
    
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    })

    renderComponent()
    await screen.findByText(/Carbon \(mt\):.+100/)
  })
}) 