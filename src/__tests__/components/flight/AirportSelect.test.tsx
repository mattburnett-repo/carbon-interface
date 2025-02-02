import React from 'react'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AirportSelect from '../../../components/flight/AirportSelect'
import { FormikProps } from 'formik'
import { renderWithMui } from '../../../test-utils/mui-test-utils'

describe('AirportSelect', () => {
  const mockOnChange = jest.fn()
  const mockOnBlur = jest.fn()

  const mockFormik = {
    getFieldProps: jest.fn().mockReturnValue({
      value: '',
      onChange: mockOnChange,
      onBlur: mockOnBlur
    })
  } as unknown as FormikProps<any>

  const mockProps = {
    parentState: mockFormik,
    endpoint: 'departure_airport',
    title: 'Departure Airport'
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders with correct label and is interactive', async () => {
    const user = userEvent.setup({ delay: null })
    renderWithMui(<AirportSelect {...mockProps} />)
    
    const select = screen.getByRole('button', { name: /departure airport/i })
    expect(select).toBeInTheDocument()
    
    await user.click(select)
    expect(select).toHaveAttribute('aria-expanded', 'true')
  })

  it('calls formik onChange when selecting an option', async () => {
    const user = userEvent.setup({ delay: null })
    renderWithMui(<AirportSelect {...mockProps} />)
    
    // Open select and choose an option
    const select = screen.getByRole('button', { name: /departure airport/i })
    await user.click(select)
    
    // Select a specific airport (LHR - London Heathrow)
    const option = screen.getByRole('option', { name: /LHR.*London Heathrow/ })
    await user.click(option)
    
    expect(mockOnChange).toHaveBeenCalled()
  })

  it('displays initial value when provided', () => {
    const mockFormikWithValue = {
      getFieldProps: jest.fn().mockReturnValue({
        value: 'LHR',
        onChange: mockOnChange,
        onBlur: mockOnBlur
      })
    } as unknown as FormikProps<any>

    renderWithMui(<AirportSelect {...mockProps} parentState={mockFormikWithValue} />)
    
    expect(screen.getByRole('button')).toHaveTextContent('LHR')
  })
}) 