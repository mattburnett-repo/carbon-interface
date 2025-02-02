import React from 'react'
import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithMui } from '../../../../test-utils/mui-test-utils'
import FlightForm from '../../../../scenes/estimates/flight/FlightForm'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'

describe('FlightForm', () => {
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

  // Silence React Query dev warnings
  const originalError = console.error
  beforeAll(() => {
    console.error = jest.fn()
  })
  
  afterAll(() => {
    console.error = originalError
  })

  beforeEach(() => {
    jest.clearAllMocks()
    queryClient.clear()
  })

  const renderForm = () => {
    return renderWithMui(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <FlightForm />
        </BrowserRouter>
      </QueryClientProvider>
    )
  }

  it('validates passenger count', async () => {
    const user = userEvent.setup({ delay: null })
    renderForm()

    const input = screen.getByLabelText(/passengers/i)
    await user.clear(input)
    await user.type(input, '0')
    await user.tab() // Trigger validation by moving focus
    
    await waitFor(() => {
      expect(screen.getByText(/Passenger Count must be greater than 0/i)).toBeInTheDocument()
    })
  })

  it('shows validation message on empty submit', async () => {
    const user = userEvent.setup({ delay: null })
    renderForm()

    await user.click(screen.getByRole('button', { name: /get estimate/i }))
    
    await waitFor(() => {
      expect(screen.getByText(/select departure airport/i)).toBeInTheDocument()
    })
  })

  it('allows changing distance unit', async () => {
    const user = userEvent.setup({ delay: null })
    renderForm()

    // Click the select to open dropdown
    await user.click(screen.getByRole('button', { name: 'Kilometers' }))

    // Click miles option
    await user.click(screen.getByRole('option', { name: 'Miles' }))

    // Verify the display shows Miles
    await waitFor(() => {
      expect(screen.getByText('Miles')).toBeInTheDocument()
    })
  })
}) 