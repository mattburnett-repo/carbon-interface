import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import FuelCombustionForm from '../../../../scenes/estimates/fuel_combustion/FuelCombustionForm'
import { act } from 'react-dom/test-utils'
import { iFormInitialValues } from '../../../../scenes/estimates/fuel_combustion/types'
import { FormikProps } from 'formik'

// Mock at the path the component uses
jest.mock('../../../../components/fuel_combustion/FuelSources', () => ({
  __esModule: true,
  FuelSourceTypes: ({ parentState }: { parentState: FormikProps<iFormInitialValues> }) => (
    <div>
      <select 
        {...parentState.getFieldProps('fuel_source_type')}
        aria-label="Fuel Source Type"
      >
        <option value="dfo">Diesel Fuel Oil</option>
      </select>
      {parentState.touched.fuel_source_type && parentState.errors.fuel_source_type ? (
        <div>{parentState.errors.fuel_source_type}</div>
      ) : null}
    </div>
  ),
  FuelSourceUnits: ({ parentState }: { parentState: FormikProps<iFormInitialValues> }) => (
    <div>
      <select 
        {...parentState.getFieldProps('fuel_source_unit')}
        aria-label="Fuel Source Unit"
      >
        <option value="btu">BTU</option>
      </select>
      {parentState.touched.fuel_source_unit && parentState.errors.fuel_source_unit ? (
        <div>{parentState.errors.fuel_source_unit}</div>
      ) : null}
    </div>
  )
}))

// Mock react-query
jest.mock('react-query', () => ({
  ...jest.requireActual('react-query'),
  useQuery: () => ({
    isLoading: false,
    error: null,
    data: {
      id: '123',
      type: 'fuel_combustion',
      attributes: {
        fuel_source_type: 'dfo',
        fuel_source_unit: 'btu',
        fuel_source_value: 100,
        carbon_g: 1000,
        carbon_lb: 2.20462,
        carbon_kg: 1,
        carbon_mt: 0.001,
        estimated_at: '2023-01-01'
      }
    }
  })
}))

describe('FuelCombustionForm', () => {
  const renderComponent = () => {
    render(
      <BrowserRouter>
        <FuelCombustionForm />
      </BrowserRouter>
    )
  }

  it('should render form fields', () => {
    renderComponent()
    expect(screen.getByRole('form')).toBeInTheDocument()
    expect(screen.getByLabelText('Fuel Source Value')).toBeInTheDocument()
    expect(screen.getByRole('combobox', { name: 'Fuel Source Type' })).toBeInTheDocument()
    expect(screen.getByText('Diesel Fuel Oil')).toBeInTheDocument()
  })

  it('should validate fuel value', async () => {
    renderComponent()
    const valueInput = screen.getByLabelText('Fuel Source Value')
    
    await act(async () => {
      fireEvent.change(valueInput, { target: { value: '0' } })
      fireEvent.blur(valueInput)
    })
    
    await waitFor(() => {
      expect(screen.getByText('Fuel source value must be greater than 0.')).toBeInTheDocument()
    })
  })

  it('should validate required fields', async () => {
    renderComponent()
    const submitButton = screen.getByRole('button', { name: /get estimate/i })
    const typeSelect = screen.getByRole('combobox', { name: 'Fuel Source Type' })
    const valueInput = screen.getByLabelText('Fuel Source Value')
    
    await act(async () => {
      // Clear all values
      fireEvent.change(typeSelect, { target: { value: '' } })
      fireEvent.blur(typeSelect)
      fireEvent.change(valueInput, { target: { value: '' } })
      fireEvent.blur(valueInput)
      fireEvent.click(submitButton)
    })
    
    await waitFor(() => {
      expect(screen.getByText('Fuel source type is required.')).toBeInTheDocument()
      expect(screen.getByText('Fuel source value is required.')).toBeInTheDocument()
    })
  })
}) 