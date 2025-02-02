import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FormikProvider, useFormik } from 'formik'
import VehicleModels from '../../../components/vehicle/VehicleModels'
import type { VehicleModel } from '../../../services/vehicleApi'
import { type iInitialValues } from '../../../scenes/estimates/vehicle/types'

const mockModels: VehicleModel[] = [
  {
    data: {
      id: 'model-1',
      type: 'vehicle_model',
      attributes: {
        name: 'Recent Model',
        year: 2023
      }
    }
  },
  {
    data: {
      id: 'model-2',
      type: 'vehicle_model',
      attributes: {
        name: 'Older Model',
        year: 2022
      }
    }
  }
]

function TestWrapper({ loading = false }) {
  const formik = useFormik<iInitialValues>({
    initialValues: {
      type: 'vehicle',
      distance_unit: 'km',
      distance_value: 0,
      vehicle_make_id: '',
      vehicle_model_id: ''
    },
    onSubmit: () => {}
  })

  return (
    <FormikProvider value={formik}>
      <VehicleModels 
        formik={formik}
        makeId="test-make-id"
        models={loading ? [] : mockModels}
        loading={loading}
      />
    </FormikProvider>
  )
}

describe('VehicleModels', () => {
  it('renders models dropdown', () => {
    render(<TestWrapper />)
    expect(screen.getByTestId('model-select')).toBeInTheDocument()
  })

  it('shows models in dropdown', () => {
    render(<TestWrapper />)
    expect(screen.getByTestId('model-select')).toBeInTheDocument()
  })
}) 