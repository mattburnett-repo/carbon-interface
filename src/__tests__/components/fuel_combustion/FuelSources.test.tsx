import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FuelSourceTypes, FuelSourceUnits, useFuelSourceName, useFuelSources, useFuelSourceUnits } from '../../../components/fuel_combustion/FuelSources'
import { renderWithMui } from '../../../test-utils/mui-test-utils'
import { Formik } from 'formik'

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
  const renderWithFormik = () => {
    return renderWithMui(
      <Formik
        initialValues={{
          type: 'fuel_combustion',
          fuel_source_type: '',
          fuel_source_unit: '',
          fuel_source_value: 0
        }}
        onSubmit={jest.fn()}
      >
        {formik => <FuelSourceTypes parentState={formik} />}
      </Formik>
    )
  }

  it('renders fuel source type select', () => {
    renderWithFormik()
    expect(screen.getByRole('button', { name: /fuel source type/i })).toBeInTheDocument()
  })

  it('renders fuel source options', async () => {
    const user = userEvent.setup({ delay: null })
    renderWithFormik()
    
    const select = screen.getByRole('button', { name: /fuel source type/i })
    await user.click(select)
    
    expect(screen.getByRole('option', { name: /diesel/i })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: /jet fuel/i })).toBeInTheDocument()
  })

  it('shows validation errors', () => {
    renderWithMui(
      <Formik
        initialValues={{
          type: 'fuel_combustion',
          fuel_source_type: '',
          fuel_source_unit: '',
          fuel_source_value: 0
        }}
        initialErrors={{ fuel_source_type: 'Required field' }}
        initialTouched={{ fuel_source_type: true }}
        onSubmit={jest.fn()}
      >
        {formik => <FuelSourceTypes parentState={formik} />}
      </Formik>
    )
    expect(screen.getByText('Required field')).toBeInTheDocument()
  })
})

describe('FuelSourceUnits', () => {
  const renderWithFormik = () => {
    return renderWithMui(
      <Formik
        initialValues={{
          type: 'fuel_combustion',
          fuel_source_type: 'jf',
          fuel_source_unit: '',
          fuel_source_value: 0
        }}
        onSubmit={jest.fn()}
      >
        {formik => <FuelSourceUnits parentState={formik} />}
      </Formik>
    )
  }

  it('renders fuel source unit select', () => {
    renderWithFormik()
    expect(screen.getByRole('button', { name: /fuel source unit/i })).toBeInTheDocument()
  })

  it('renders unit options', async () => {
    const user = userEvent.setup({ delay: null })
    renderWithFormik()
    
    const select = screen.getByRole('button', { name: /fuel source unit/i })
    await user.click(select)
    
    expect(screen.getByRole('option', { name: 'gal' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'l' })).toBeInTheDocument()
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