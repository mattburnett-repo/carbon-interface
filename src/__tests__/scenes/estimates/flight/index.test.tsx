import React from 'react'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithMui } from '../../../../test-utils/mui-test-utils'
import Flight from '../../../../scenes/estimates/flight'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'

describe('Flight Estimate', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
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
    queryClient.clear()
  })

  const renderComponent = () => {
    return renderWithMui(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Flight />
        </BrowserRouter>
      </QueryClientProvider>
    )
  }

  it('renders the flight form', async () => {
    renderComponent()
    expect(screen.getByRole('form')).toBeInTheDocument()
    expect(screen.getByLabelText(/passengers/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Kilometers' })).toBeInTheDocument()
  })
}) 