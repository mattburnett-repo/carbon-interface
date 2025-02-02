import React from 'react'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CabinClassSelect from '../../../components/flight/CabinClassSelect'
import { FormikProps } from 'formik'
import { renderWithMui } from '../../../test-utils/mui-test-utils'

describe('CabinClassSelect', () => {
  const mockFormik = {
    getFieldProps: jest.fn().mockReturnValue({
      value: '',
      onChange: jest.fn(),
      onBlur: jest.fn()
    })
  } as unknown as FormikProps<any>

  const mockProps = {
    parentState: mockFormik
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders with correct label and options', async () => {
    const user = userEvent.setup({ delay: null })
    renderWithMui(<CabinClassSelect {...mockProps} />)
    
    // Check label and select exist
    const select = screen.getByRole('button', { name: /cabin class/i })
    expect(select).toBeInTheDocument()
    
    // Check options are shown when clicked
    await user.click(select)
    expect(select).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('option', { name: /economy/i })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: /premium/i })).toBeInTheDocument()
  })

  it('selects an option', async () => {
    const user = userEvent.setup({ delay: null })
    renderWithMui(<CabinClassSelect {...mockProps} />)
    
    const select = screen.getByRole('button', { name: /cabin class/i })
    await user.click(select)
    
    const option = screen.getByRole('option', { name: /economy/i })
    await user.click(option)
    
    expect(mockFormik.getFieldProps).toHaveBeenCalled()
  })

  it('displays initial value when provided', () => {
    const mockFormikWithValue = {
      getFieldProps: jest.fn().mockReturnValue({
        value: 'economy',
        onChange: jest.fn(),
        onBlur: jest.fn()
      })
    } as unknown as FormikProps<any>

    renderWithMui(<CabinClassSelect {...mockProps} parentState={mockFormikWithValue} />)
    expect(screen.getByRole('button')).toHaveTextContent(/economy/i)
  })
}) 