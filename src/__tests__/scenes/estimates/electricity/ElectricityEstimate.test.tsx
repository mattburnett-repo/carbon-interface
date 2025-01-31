import React from 'react'
import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import ElectricityEstimate from '../../../../scenes/estimates/electricity/ElectricityEstimate'
import { iInitialValues } from '../../../../scenes/estimates/electricity/types'
import { act } from 'react-dom/test-utils'

// Mock components
jest.mock('../../../../components/LoadingDisplay', () => ({
  __esModule: true,
  default: () => <div>Loading...</div>
}))

jest.mock('../../../../components/ErrorDisplay', () => ({
  __esModule: true,
  default: () => <div>Error</div>
}))

jest.mock('../../../../scenes/estimates/electricity/ElectricityEstimateDisplay', () => ({
  __esModule: true,
  default: () => <div>Estimate Display</div>
}))

// Mock fetch
global.fetch = jest.fn()

describe('ElectricityEstimate', () => {
  // Silence console.error for expected errors
  const originalError = console.error;
  beforeAll(() => {
    console.error = jest.fn();
  });
  
  afterAll(() => {
    console.error = originalError;
  });

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        // Disable error logging in tests
        onError: () => {}
      }
    }
  })

  const mockEstimateValues: iInitialValues = {
    type: 'electricity',
    electricity_value: 100,
    electricity_unit: 'kwh',
    country: 'us',
    state: 'ca'
  }

  const renderComponent = () => {
    return render(
      <QueryClientProvider client={queryClient}>
        <ElectricityEstimate estimateValues={mockEstimateValues} />
      </QueryClientProvider>
    )
  }

  beforeEach(() => {
    jest.clearAllMocks()
    queryClient.clear()  // Clear React Query cache
  })

  it('should show loading state', () => {
    ;(global.fetch as jest.Mock).mockImplementationOnce(() => new Promise(() => {}))
    renderComponent()
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('should show error state', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ message: 'API Error' })
    })
    
    await act(async () => {
      renderComponent()
      await new Promise(resolve => setTimeout(resolve, 100))
    })
    
    expect(screen.getByText('Error')).toBeInTheDocument()
  })

  it('should show estimate display on successful response', async () => {
    const mockResponse = {
      data: {
        id: '123',
        type: 'electricity',
        attributes: {
          carbon_g: 1000,
          carbon_lb: 2.20462,
          carbon_kg: 1,
          carbon_mt: 0.001,
          estimated_at: '2023-01-01',
          electricity_unit: 'kwh',
          electricity_value: 100,
          country: 'us',
          state: 'ca'
        }
      }
    }

    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    })

    await act(async () => {
      renderComponent()
      await new Promise(resolve => setTimeout(resolve, 100))
    })

    expect(screen.getByText('Estimate Display')).toBeInTheDocument()
  })
}) 