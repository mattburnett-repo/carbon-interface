import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AirportSelect from '../../../components/flight/AirportSelect'
import { FormikProps } from 'formik'

describe('AirportSelect', () => {
  const mockFormik = {
    getFieldProps: jest.fn().mockReturnValue({
      value: '',
      onChange: jest.fn(),
      onBlur: jest.fn()
    })
  } as unknown as FormikProps<any>

  const mockProps = {
    parentState: mockFormik,
    endpoint: 'departure_airport',
    title: 'Departure Airport'
  }

  it('renders with correct label', () => {
    render(<AirportSelect {...mockProps} />)
    expect(screen.getByLabelText(/departure airport/i)).toBeInTheDocument()
  })

  it('renders default option', async () => {
    render(<AirportSelect {...mockProps} />)
    const select = screen.getByLabelText(/departure airport/i)
    await userEvent.click(select)
    
    expect(screen.getByRole('option', { name: /select airport/i })).toBeInTheDocument()
  })
}) 