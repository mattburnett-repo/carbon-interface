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

  const airports = [
    {
      title: 'Departure Airport',
      endpoint: 'departure_airport',
      testAirport: 'LHR.*London Heathrow'
    },
    {
      title: 'Destination Airport',
      endpoint: 'destination_airport',
      testAirport: 'CDG.*Paris Charles de Gaulle'
    }
  ] as const

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it.each(airports)('renders $title with correct label and is interactive', async ({ title, endpoint }) => {
    const user = userEvent.setup({ delay: null })
    renderWithMui(<AirportSelect parentState={mockFormik} endpoint={endpoint} title={title} />)
    
    const select = screen.getByRole('button', { name: new RegExp(title, 'i') })
    expect(select).toBeInTheDocument()
    
    await user.click(select)
    expect(select).toHaveAttribute('aria-expanded', 'true')
  })

  it.each(airports)('selects a $title option', async ({ title, endpoint, testAirport }) => {
    const user = userEvent.setup({ delay: null })
    renderWithMui(<AirportSelect parentState={mockFormik} endpoint={endpoint} title={title} />)
    
    const select = screen.getByRole('button', { name: new RegExp(title, 'i') })
    await user.click(select)
    
    const option = screen.getByRole('option', { name: new RegExp(testAirport) })
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

    renderWithMui(<AirportSelect 
      parentState={mockFormikWithValue} 
      endpoint="departure_airport" 
      title="Departure Airport" 
    />)
    
    expect(screen.getByRole('button')).toHaveTextContent('LHR')
  })
}) 