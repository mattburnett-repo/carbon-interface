import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FuelSourceTypes, FuelSourceUnits, FormValues, useFuelSourceName, useFuelSources, useFuelSourceUnits } from '../../../components/fuel_combustion/FuelSources'
import { FormikProps } from 'formik'

// Mock the fuel source data
jest.mock('../../../components/fuel_combustion/fuelSourcesData.ts', () => [
  {
    api_name: 'jf',
    name: 'Jet Fuel',
    units: [{ unit: 'gal' }, { unit: 'l' }]
  },
  {
    api_name: 'diesel',
    name: 'Diesel',
    units: [{ unit: 'gal' }, { unit: 'l' }]
  }
])

describe('FuelSourceTypes', () => {
  const mockFormik = {
    getFieldProps: jest.fn().mockReturnValue({
      value: '',
      onChange: jest.fn(),
      onBlur: jest.fn()
    }),
    values: { fuel_source_type: '', fuel_source_unit: '' },
    touched: {},
    errors: {},
    isSubmitting: false,
    isValidating: false,
    submitCount: 0
  } as unknown as FormikProps<FormValues>

  it('renders fuel source type select', () => {
    render(<FuelSourceTypes parentState={mockFormik} />)
    expect(screen.getByLabelText(/fuel source type/i)).toBeInTheDocument()
  })

  it('renders fuel source options', async () => {
    render(<FuelSourceTypes parentState={mockFormik} />)
    const select = screen.getByLabelText(/fuel source type/i)
    await userEvent.click(select)
    
    expect(screen.getByText('Jet Fuel')).toBeInTheDocument()
    expect(screen.getByText('Diesel')).toBeInTheDocument()
  })

  it('handles selection changes', async () => {
    render(<FuelSourceTypes parentState={mockFormik} />)
    const select = screen.getByLabelText(/fuel source type/i)
    await userEvent.click(select)
    await userEvent.click(screen.getByText('Diesel'))
    
    expect(mockFormik.getFieldProps('fuel_source_type').onChange).toHaveBeenCalled()
  })

  it('shows validation errors when present', () => {
    const formikWithError = {
      ...mockFormik,
      touched: { fuel_source_type: true },
      errors: { fuel_source_type: 'Required field' }
    } as unknown as FormikProps<FormValues>
    render(<FuelSourceTypes parentState={formikWithError} />)
    expect(screen.getByText('Required field')).toBeInTheDocument()
  })
})

describe('FuelSourceUnits', () => {
  const mockFormik = {
    getFieldProps: jest.fn().mockReturnValue({
      value: '',
      onChange: jest.fn(),
      onBlur: jest.fn()
    }),
    values: { fuel_source_type: 'jf', fuel_source_unit: '' },
    touched: {},
    errors: {},
    isSubmitting: false,
    isValidating: false,
    submitCount: 0
  } as unknown as FormikProps<FormValues>

  it('renders fuel source unit select', () => {
    render(<FuelSourceUnits parentState={mockFormik} />)
    expect(screen.getByLabelText(/fuel source unit/i)).toBeInTheDocument()
  })

  it('renders unit options for selected fuel source', async () => {
    render(<FuelSourceUnits parentState={mockFormik} />)
    const select = screen.getByLabelText(/fuel source unit/i)
    await userEvent.click(select)
    
    expect(screen.getByText('gal')).toBeInTheDocument()
    expect(screen.getByText('l')).toBeInTheDocument()
  })

  it('shows validation errors when present', () => {
    const formikWithError = {
      ...mockFormik,
      touched: { fuel_source_unit: true },
      errors: { fuel_source_unit: 'Required field' }
    } as unknown as FormikProps<FormValues>
    render(<FuelSourceUnits parentState={formikWithError} />)
    expect(screen.getByText('Required field')).toBeInTheDocument()
  })
})

describe('useFuelSourceName', () => {
  it('returns default name for empty input', () => {
    expect(useFuelSourceName('')).toBe('Jet Fuel')
  })

  it('returns correct name for valid input', () => {
    expect(useFuelSourceName('diesel')).toBe('Diesel')
  })
})

describe('useFuelSources', () => {
  it('returns sorted fuel sources', () => {
    const sources = useFuelSources()
    expect(sources).toEqual([
      { api_name: 'diesel', name: 'Diesel' },
      { api_name: 'jf', name: 'Jet Fuel' }
    ])
  })
})

describe('useFuelSourceUnits', () => {
  it('returns default units for empty input', () => {
    const units = useFuelSourceUnits('')
    expect(units).toEqual([{ unit: 'gal' }, { unit: 'l' }])
  })

  it('returns correct units for valid input', () => {
    const units = useFuelSourceUnits('diesel')
    expect(units).toEqual([{ unit: 'gal' }, { unit: 'l' }])
  })
}) 