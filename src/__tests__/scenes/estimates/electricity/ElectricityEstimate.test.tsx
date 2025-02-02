import React from 'react'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithMui } from '../../../../test-utils/mui-test-utils'
import ElectricityEstimate from '../../../../scenes/estimates/electricity/ElectricityEstimate'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

describe('ElectricityEstimate', () => {
  // Silence React Query's console completely
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
        retry: 0,
        cacheTime: 0,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        suspense: false,
        useErrorBoundary: false,
        onError: () => {},
        onSuccess: () => {},
        onSettled: () => {}
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

    return renderWithMui(
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

  it('should show error state', async () => {
    // Mock the fetch to return an error response
    ;(global.fetch as jest.Mock).mockImplementationOnce(() => 
      Promise.resolve({
        ok: false,
        status: 400,
        json: () => Promise.resolve({ error: { message: 'API Error' } })
      })
    )
    
    renderComponent()
    await waitFor(() => {
      expect(screen.getByText('API Error')).toBeInTheDocument()
    })
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
    
    await waitFor(() => {
      expect(screen.getByText(/Carbon \(mt\):.+100/)).toBeInTheDocument()
      expect(screen.getByText(/Country:.+US/)).toBeInTheDocument()
      expect(screen.getByText(/State\/Region:.+CA/)).toBeInTheDocument()
    })
  })
}) 