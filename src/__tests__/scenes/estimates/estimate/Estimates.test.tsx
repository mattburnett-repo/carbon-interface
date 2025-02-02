import React from 'react'
import { screen, waitFor } from '@testing-library/react'
import { renderWithMui } from '../../../../test-utils/mui-test-utils'
import Estimates from '../../../../scenes/estimates/estimate/Estimates'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

// Mock components
jest.mock('../../../../components/LoadingDisplay', () => ({
  __esModule: true,
  default: () => <div data-testid="loading-spinner" />
}))

jest.mock('../../../../components/ErrorDisplay', () => ({
  __esModule: true,
  default: ({ message }: { message: string }) => <div data-testid="error-display">{message || 'No message provided'}</div>
}))

interface EstimateData {
  data: Array<{
    id: string;
    type: string;
    attributes: {
      carbon_g: number;
      carbon_lb: number;
      carbon_kg: number;
      carbon_mt: number;
      estimated_at: string;
    };
  }>;
}

jest.mock('../../../../scenes/estimates/estimate/EstimatesDisplay', () => ({
  __esModule: true,
  default: ({ data }: { data: EstimateData }) => <div>Estimates Display: {JSON.stringify(data)}</div>
}))

// Mock fetch
global.fetch = jest.fn()

describe('Estimates', () => {
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
    return renderWithMui(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Estimates />
        </BrowserRouter>
      </QueryClientProvider>
    )
  }

  beforeEach(() => {
    jest.clearAllMocks()
    queryClient.clear()
  })

  // Silence console.error for expected errors
  const originalError = console.error;
  beforeAll(() => {
    console.error = jest.fn();
  });

  afterAll(() => {
    console.error = originalError;
  });

  it('should show loading state', () => {
    ;(global.fetch as jest.Mock).mockImplementationOnce(() => new Promise(() => {}))
    renderComponent()
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
  })

  it('should show error state', async () => {
    ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error())
    
    renderComponent()
    await waitFor(() => {
      expect(screen.getByTestId('error-display')).toBeInTheDocument()
    })
  })

  it('should show estimates display on successful response', async () => {
    const mockResponse = {
      data: [{
        id: '123',
        type: 'electricity',
        attributes: { carbon_mt: 100 }
      }]
    }
    
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    })

    renderComponent()
    await waitFor(() => {
      expect(screen.getByText(/100/)).toBeInTheDocument()
    })
  })
}) 