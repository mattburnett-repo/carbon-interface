import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'
import { Formik } from 'formik'
import Flight from '../../../../scenes/estimates/flight'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
})

const renderWithProviders = () => {
  return render(
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Formik
          initialValues={{
            distance_unit: 'km',
            passenger_count: 1,
            legs: []
          }}
          onSubmit={() => {}}
        >
          <Flight />
        </Formik>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

describe('Flight Estimate', () => {
  beforeEach(() => {
    // Reset form state between tests
    queryClient.clear()
  })

  it('renders the flight form', () => {
    renderWithProviders()
    expect(screen.getByLabelText(/distance unit/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/passengers/i)).toBeInTheDocument()
  })

  it('shows validation errors for required fields', async () => {
    renderWithProviders()
    const form = screen.getByRole('form')
    
    // Submit empty form
    await fireEvent.submit(form)
    
    // Wait for validation errors
    await waitFor(() => {
      const errors = screen.getAllByRole('alert')
      expect(errors).toHaveLength(1)
      expect(errors[0]).toHaveTextContent(/at least one flight leg is required/i)
    }, {
      timeout: 2000
    })
  })

  // Add more tests for form submission, API integration, etc.
})

describe('Flight', () => {
  it('should render flight form', () => {
    render(
      <BrowserRouter>
        <Flight />
      </BrowserRouter>
    )
    expect(screen.getByRole('form')).toBeInTheDocument()
  })
}) 