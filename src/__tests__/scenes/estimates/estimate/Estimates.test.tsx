import React from 'react'
import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import Estimates from '../../../../scenes/estimates/estimate/Estimates'
import { act } from 'react-dom/test-utils'

// Mock components
jest.mock('../../../../components/LoadingDisplay', () => ({
  __esModule: true,
  default: () => <div data-testid="loading-spinner" />
}))

jest.mock('../../../../components/ErrorDisplay', () => ({
  __esModule: true,
  default: () => <div>Error</div>
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
        retry: false,
        onError: () => {} // Disable error logging in tests
      }
    }
  })

  const renderComponent = () => {
    return render(
      <QueryClientProvider client={queryClient}>
        <Estimates />
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

  it('should show estimates display on successful response', async () => {
    const mockResponse = {
      data: [
        {
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
      ]
    }

    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    })

    await act(async () => {
      renderComponent()
      await new Promise(resolve => setTimeout(resolve, 100))
    })

    expect(screen.getByText(`Estimates Display: ${JSON.stringify(mockResponse)}`)).toBeInTheDocument()
  })
}) 