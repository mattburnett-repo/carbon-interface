import React from 'react'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithMui } from '../../../../test-utils/mui-test-utils'
import ElectricityForm from '../../../../scenes/estimates/electricity/ElectricityForm'
import { BrowserRouter } from 'react-router-dom'
import * as router from 'react-router'

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: jest.fn()
}))

describe('ElectricityForm', () => {
  const mockNavigate = jest.fn()
  const mockSubmit = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(router.useNavigate as jest.Mock).mockImplementation(() => mockNavigate)
  })

  const renderForm = () => {
    const initialValues = {
      type: 'electricity' as const,
      electricity_value: 1,
      electricity_unit: 'kwh' as const,
      country: 'AT',
      state: ''
    }

    return renderWithMui(
      <BrowserRouter>
        <ElectricityForm initialValues={initialValues} onSubmit={mockSubmit} />
      </BrowserRouter>
    )
  }

  it('should validate required fields', async () => {
    const user = userEvent.setup({ delay: null })
    renderForm()
    
    const valueInput = screen.getByDisplayValue('1')
    await waitFor(async () => {
      await user.clear(valueInput)
      await user.click(screen.getByRole('button', { name: /get estimate/i }))
    })
    
    await waitFor(() => {
      expect(screen.getByText(/required/i)).toBeInTheDocument()
    })
  })

  it('should submit form with valid data', async () => {
    const user = userEvent.setup({ delay: null })
    renderForm()

    const valueInput = screen.getByDisplayValue('1')
    await waitFor(async () => {
      await user.clear(valueInput)
      await user.type(valueInput, '100')
      await user.click(screen.getByRole('button', { name: /get estimate/i }))
    })

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        type: 'electricity',
        electricity_value: '100',
        electricity_unit: 'kwh',
        country: 'AT',
        state: ''
      })
      expect(mockNavigate).toHaveBeenCalledWith('/estimates/electricity', {
        state: { 
          values: {
            type: 'electricity',
            electricity_value: '100',
            electricity_unit: 'kwh',
            country: 'AT',
            state: ''
          }
        }
      })
    })
  })

  // Similar pattern for other tests...
}) 