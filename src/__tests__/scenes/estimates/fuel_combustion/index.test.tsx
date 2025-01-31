import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import FuelCombustion from '../../../../scenes/estimates/fuel_combustion'
import { FormikProps } from 'formik'
import { type iFormInitialValues } from '../../../../scenes/estimates/fuel_combustion/types'

// Mock at the path the component uses
jest.mock('../../../../components/fuel_combustion/FuelSources', () => ({
  __esModule: true,
  FuelSourceTypes: ({ parentState }: { parentState: FormikProps<iFormInitialValues> }) => (
    <div>
      <select {...parentState.getFieldProps('fuel_source_type')} aria-label="fuel source type">
        <option value="dfo">Diesel Fuel Oil</option>
      </select>
    </div>
  ),
  FuelSourceUnits: ({ parentState }: { parentState: FormikProps<iFormInitialValues> }) => (
    <div>
      <select {...parentState.getFieldProps('fuel_source_unit')} aria-label="fuel source unit">
        <option value="btu">BTU</option>
      </select>
    </div>
  )
}))

describe('FuelCombustion', () => {
  it('should render fuel combustion form', () => {
    render(
      <BrowserRouter>
        <FuelCombustion />
      </BrowserRouter>
    )
    expect(screen.getByRole('form')).toBeInTheDocument()
  })
}) 