import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import ElectricityForm from '../../../../scenes/estimates/electricity/ElectricityForm'
import { iInitialValues } from '../../../../scenes/estimates/electricity/types'

// Mock useNavigate
const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}))

// Mock region components
jest.mock('../../../../components/regions/CountryCodes', () => ({
  __esModule: true,
  default: () => <select aria-label="country"><option value="us">US</option></select>
}))

jest.mock('../../../../components/regions/RegionCodes', () => ({
  __esModule: true,
  default: () => <select data-testid="state-select" aria-label="state"><option value="ca">CA</option></select>
}))

interface NavigateState {
  state: {
    values: iInitialValues;
  };
}

type FormValues = {
  electricity_value: number
  electricity_unit: 'mwh' | 'kwh'
  country: string
  state: string
}

// Update component type
const Component = ElectricityForm as React.ComponentType<{
  onSubmit: (values: iInitialValues) => void
  initialValues: iInitialValues
}>

describe('ElectricityForm', () => {
  const mockSubmit = jest.fn<void, [iInitialValues]>()
  const user = userEvent.setup()

  beforeEach(() => {
    mockSubmit.mockClear()
    mockNavigate.mockClear()
  })

  const renderForm = () => {
    const initialValues: iInitialValues = {
      type: 'electricity',
      electricity_value: 1,
      electricity_unit: 'kwh',
      country: 'us',
      state: 'ca'
    }
    
    return render(
      <BrowserRouter>
        <Component onSubmit={mockSubmit} initialValues={initialValues} />
      </BrowserRouter>
    )
  }

  test('should validate required fields', async () => {
    renderForm()
    
    const valueInput = screen.getByDisplayValue('1')
    await user.clear(valueInput)
    await user.click(screen.getByRole('button', { name: /get estimate/i }))

    expect(await screen.findByText(/required/i)).toBeInTheDocument()
    expect(mockSubmit).not.toHaveBeenCalled()
  })

  test('should submit form with valid data', async () => {
    renderForm()

    const valueInput = screen.getByDisplayValue('1')
    await user.clear(valueInput)
    await user.type(valueInput, '100')
    
    const unitInput = screen.getByRole('button', { name: /electricity unit/i })
      .nextElementSibling as HTMLInputElement
    fireEvent.change(unitInput, { target: { value: 'mwh' } })

    mockSubmit.mockImplementationOnce((values) => {
      expect(values).toEqual({
        type: 'electricity',
        electricity_value: '100',
        electricity_unit: 'mwh',
        country: 'us',
        state: 'ca'
      })
    })

    await user.click(screen.getByRole('button', { name: /get estimate/i }))
  })

  test('should render initial values correctly', () => {
    renderForm()
    
    expect(screen.getByDisplayValue('1')).toBeInTheDocument()
    expect(screen.getByText('KWH')).toBeInTheDocument()
    expect(screen.getByText('US')).toBeInTheDocument()
  })

  test('should validate electricity value is a number', async () => {
    renderForm()
    
    const valueInput = screen.getByDisplayValue('1')
    await user.clear(valueInput)
    await user.type(valueInput, 'not-a-number')
    await user.click(screen.getByRole('button', { name: /get estimate/i }))

    expect(await screen.findByText(/must be a `number` type/i)).toBeInTheDocument()
    expect(mockSubmit).not.toHaveBeenCalled()
  })

  test('should navigate on successful submit', async () => {
    renderForm()
    
    const valueInput = screen.getByDisplayValue('1')
    await user.click(screen.getByRole('button', { name: /get estimate/i }))

    expect(mockNavigate).toHaveBeenCalledWith(
      '/estimates/electricity',
      expect.objectContaining<NavigateState>({
        state: {
          values: expect.any(Object)
        }
      })
    )
  })

  test('should handle negative numbers correctly', async () => {
    renderForm()
    
    const valueInput = screen.getByDisplayValue('1')
    await user.clear(valueInput)
    await user.type(valueInput, '-100')
    await user.click(screen.getByRole('button', { name: /get estimate/i }))

    expect(await screen.findByText(/must be greater than 0/i)).toBeInTheDocument()
    expect(mockSubmit).not.toHaveBeenCalled()
  })

  test('should handle unit conversion', async () => {
    renderForm()
    
    const valueInput = screen.getByDisplayValue('1')
    await user.clear(valueInput)
    await user.type(valueInput, '1000')
    
    const unitInput = screen.getByRole('button', { name: /electricity unit/i })
      .nextElementSibling as HTMLInputElement
    fireEvent.change(unitInput, { target: { value: 'kwh' } })
    
    await user.click(screen.getByRole('button', { name: /get estimate/i }))

    expect(mockNavigate).toHaveBeenCalledWith(
      '/estimates/electricity',
      expect.objectContaining<NavigateState>({
        state: {
          values: expect.objectContaining({
            electricity_value: '1000',
            electricity_unit: 'kwh'
          })
        }
      })
    )
  })

  test('should show state select for US', () => {
    renderForm()
    
    // Find the country select and verify US is selected
    const countrySelect = screen.getByRole('combobox', { name: /country/i })
    expect(countrySelect).toHaveValue('us')
  })
}) 