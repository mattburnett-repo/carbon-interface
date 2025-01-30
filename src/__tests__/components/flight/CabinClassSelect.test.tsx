import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CabinClassSelect from '../../../components/flight/CabinClassSelect'
import { FormikProps } from 'formik'

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

  it('renders with correct label', () => {
    render(<CabinClassSelect {...mockProps} />)
    expect(screen.getByLabelText(/cabin class/i)).toBeInTheDocument()
  })

  it('renders cabin class options', async () => {
    render(<CabinClassSelect {...mockProps} />)
    const select = screen.getByLabelText(/cabin class/i)
    await userEvent.click(select)
    
    expect(screen.getByRole('option', { name: /economy/i })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: /premium/i })).toBeInTheDocument()
  })
}) 